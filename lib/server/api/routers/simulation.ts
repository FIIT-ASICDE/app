import { loadRepoFile } from "@/lib/files/repo-files";
import {
    absoluteRepoPath,
    resolveRepoPath,
} from "@/lib/server/api/routers/repos";
import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";
import { SimulationOutput } from "@/lib/types/editor";
import { DirectoryItem, FileDisplayItem } from "@/lib/types/repository";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { exec, spawn } from "child_process";
import FormData from "form-data";
import fs, { promises } from "fs";
import path from "path";
import util from "util";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const execPromise = util.promisify(exec);

export const simulationRouter = createTRPCRouter({
    simulateVerilatorCpp: simulateVerilatorCpp(),
    simulateVerilatorCppStream: simulateVerilatorCppStream(),
    simulateIcarusVerilogStream: simulateIcarusVerilogStream(),
    simulateVerilatorSvStream: simulateVerilatorSvStream(),
    getLastFinishedSimulation: getLastFinishedSimulation(),
});

function simulateVerilatorCpp() {
    return publicProcedure
        .input(
            z.object({
                testbenchPath: z
                    .string()
                    .min(1, "Testbench súbor musí mať názov."),
                repoId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const repoIdDecoded = decodeURIComponent(input.repoId);
                const testbenchPathDecode = decodeURIComponent(
                    input.testbenchPath,
                );
                console.log("som tu");

                const absoluteRepoPath = await resolveRepoPath(
                    ctx.prisma,
                    repoIdDecoded,
                );
                console.log(absoluteRepoPath);
                console.log(testbenchPathDecode);

                const containerId = uuidv4();

                // Optional: Build image if needed
                //await execPromise(`docker build -t verilator-image ./docker`);

                // Run container with volume
                await execPromise(
                    `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
                );

                console.log(`✅ Kontajner ${containerId} spustený.`);

                // const { stdout } = await execPromise(
                //     `docker exec ${containerId} find /workspace -type f`
                // );
                //
                // const filePaths = stdout.split("\n").filter(Boolean); // pole so súbormi
                // console.log("✅ Súbory v workspace:", filePaths);
                //
                // const svFilesPath = filePaths.filter(f => f.endsWith(".sv"));
                // const svFinalPath = svFilesPath.map(file => file.replace(/^\/workspace\//, ''));
                //
                // console.log("✅ SV súbory v workspace:", svFinalPath);

                const now = new Date();
                const simulationDir = now.toISOString().replace(/[:.]/g, "-");

                const svFiles = await getAllFilesByExtension(
                    absoluteRepoPath!,
                    ".sv",
                );
                if (svFiles.length === 0) {
                    await execPromise(`docker rm -f ${containerId}`);
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Chyba pri simulácií.",
                    });
                }

                const svFilesString = svFiles.map((f) => `"${f}"`).join(" ");

                const verilatorCommand = ` cd /workspace && verilator --cc --exe --build ${svFilesString} ${testbenchPathDecode} --Mdir sim_${simulationDir}`;

                const { stdout, stderr } = await execPromise(
                    `docker exec ${containerId} bash -c "${verilatorCommand}"`,
                );
                console.log("stdout:", stdout);
                console.log("stderr:", stderr);

                console.log("✅ Simulácia prebehla.");
            } catch (error) {
                console.error("❌ Chyba pri simulácií:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Chyba pri simulácií.",
                });
            }
        });
}

function simulateVerilatorCppStream() {
    return publicProcedure
        .input(
            z.object({
                testbenchPath: z
                    .string()
                    .min(1, "Testbench súbor musí mať názov."),
                repoId: z.string(),
            }),
        )
        .query(async function* ({ input, ctx }) {
            yield {
                type: "info",
                content: "Simulation Verilator C++ started.",
            } satisfies SimulationOutput;

            const repoIdDecoded = decodeURIComponent(input.repoId);
            const testbenchPathDecode = decodeURIComponent(
                input.testbenchPath,
            ).replace(/\\/g, "/");

            const absoluteRepoPath = await resolveRepoPath(
                ctx.prisma,
                repoIdDecoded,
            );
            const containerId = uuidv4();

            await execPromise(
                `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
            );

            const now = new Date();
            const simulationDir = now.toISOString().replace(/[:.]/g, "-");
            const simDirPath = `sim_${simulationDir}`;
            const outputFile = `${simDirPath}/output.txt`;

            const svFiles = await getAllFilesByExtension(
                absoluteRepoPath!,
                ".sv",
            );
            if (svFiles.length === 0) {
                yield {
                    type: "error",
                    content: "❌ Žiadne .sv súbory sa nenašli vo workspaci.",
                } satisfies SimulationOutput;
                await execPromise(`docker rm -f ${containerId}`);
                return;
            }

            const svFilesString = svFiles
                .map((f) => `"${f.replace(/\\/g, "/")}"`)
                .join(" ");

            // Príkaz, ktorý spustí Verilator a zároveň uloží výstup do súboru
            const verilatorCommand =
                ` cd /workspace && mkdir -p ${simDirPath} &&
                verilator --cc --exe --build ${svFilesString} ${testbenchPathDecode} --Mdir ${simDirPath} |
                tee ${outputFile}
              `.replace(/\n/g, " ");

            const simulation = spawn("docker", [
                "exec",
                containerId,
                "bash",
                "-c",
                verilatorCommand,
            ]);

            for await (const chunk of simulation.stdout) {
                yield {
                    type: "info",
                    content: `[stdout] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            for await (const chunk of simulation.stderr) {
                yield {
                    type: "error",
                    content: `[stdout] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            yield {
                type: "info",
                content: `✅ Simulation successfully finished.`,
            } satisfies SimulationOutput;

            // Cleanup: zmažeme kontajner (voliteľne môžeš ponechať pre debug)
            await execPromise(`docker rm -f ${containerId}`);
        });
}

function simulateVerilatorSvStream() {
    return publicProcedure
        .input(
            z.object({
                testbenchPath: z
                    .string()
                    .min(1, "Testbench súbor musí mať názov."),
                repoId: z.string(),
            }),
        )
        .query(async function* ({ input, ctx }) {
            yield {
                type: "info",
                content: `Simulation Verilator SV started.`,
            } satisfies SimulationOutput;

            const repoIdDecoded = decodeURIComponent(input.repoId);
            const testbenchPathDecode = decodeURIComponent(
                input.testbenchPath,
            ).replace(/\\/g, "/");

            const absoluteRepoPath = await resolveRepoPath(
                ctx.prisma,
                repoIdDecoded,
            );
            const containerId = uuidv4();

            await execPromise(
                `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
            );

            const now = new Date();
            const simulationDir = now.toISOString().replace(/[:.]/g, "-");
            const simDirPath = `sim_${simulationDir}`;
            const outputFile = `${simDirPath}/output.txt`;

            console.log("absolute repo path: ", absoluteRepoPath);
            const svFiles = await getAllFilesByExtension(
                absoluteRepoPath!,
                ".sv",
            );
            if (svFiles.length === 0) {
                yield {
                    type: "error",
                    content: "❌ Žiadne .sv súbory sa nenašli vo workspaci.",
                } satisfies SimulationOutput;
                await execPromise(`docker rm -f ${containerId}`);
                return;
            }

            const svFilesString = svFiles
                .map((f) => `"${f.replace(/\\/g, "/")}"`)
                .join(" ");

            // transpilacia
            let cppContent: string;
            try {
                cppContent = await transpileSvFile(
                    path.join(absoluteRepoPath!, testbenchPathDecode),
                );
            } catch (error) {
                console.error("❌ Transpilation failed:", error);

                yield {
                    type: "error",
                    content: "❌ Chyba počas transpilácie testbench súboru.",
                } satisfies SimulationOutput;
                if (axios.isAxiosError(error) && error.response) {
                    yield {
                        type: "error",
                        content: `[transpilation error] ${error.response.status} ${error.response.statusText}`,
                    } satisfies SimulationOutput;
                    yield {
                        type: "error",
                        content: `[transpilation body] ${JSON.stringify(error.response.data)}`,
                    } satisfies SimulationOutput;
                } else {
                    yield {
                        type: "error",
                        content: `[transpilation error] ${String(error)}`,
                    } satisfies SimulationOutput;
                }

                await execPromise(`docker rm -f ${containerId}`);
                return;
            }

            const cppPath = path.join(
                absoluteRepoPath!,
                testbenchPathDecode.replace(/\.sv$/, ".cpp"),
            );

            await promises.writeFile(cppPath, cppContent);

            const cppFileName = testbenchPathDecode.replace(/\.sv$/, ".cpp");

            const verilatorCommand = `
                cd /workspace && mkdir -p ${simDirPath} &&
                verilator --cc --exe --build ${svFilesString} ${cppFileName} --Mdir ${simDirPath} |
                tee ${outputFile}
            `.replace(/\n/g, " ");

            const simulation = spawn("docker", [
                "exec",
                containerId,
                "bash",
                "-c",
                verilatorCommand,
            ]);

            for await (const chunk of simulation.stdout) {
                yield {
                    type: "info",
                    content: `[stdout] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            for await (const chunk of simulation.stderr) {
                console.log(chunk.toString());
                yield {
                    type: "error",
                    content: `[stderr] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            yield {
                type: "info",
                content: `✅ Simulation successfully finished.`,
            } satisfies SimulationOutput;

            // Cleanup: zmažeme kontajner (voliteľne môžeš ponechať pre debug)
            await execPromise(`docker rm -f ${containerId}`);
        });
}

function simulateIcarusVerilogStream() {
    return publicProcedure
        .input(
            z.object({
                testbenchPath: z
                    .string()
                    .min(1, "Testbench súbor musí mať názov."),
                repoId: z.string(),
            }),
        )
        .query(async function* ({ input, ctx }) {
            yield {
                type: "info",
                content: `Simulation Icarus Verilog started.`,
            } satisfies SimulationOutput;

            const repoIdDecoded = decodeURIComponent(input.repoId);
            const testbenchPathDecode = decodeURIComponent(input.testbenchPath);

            const absoluteRepoPath = await resolveRepoPath(
                ctx.prisma,
                repoIdDecoded,
            );
            const containerId = uuidv4();

            await execPromise(
                `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
            );

            const now = new Date();
            const simulationDir = now.toISOString().replace(/[:.]/g, "-");
            const simDirPath = `sim_${simulationDir}`;
            const outputFile = `${simDirPath}/output.txt`;

            const vFiles = await getAllFilesByExtension(
                absoluteRepoPath!,
                ".v",
            );
            if (vFiles.length === 0) {
                yield {
                    type: "error",
                    content: "❌ Žiadne .v súbory sa nenašli vo workspaci.",
                } satisfies SimulationOutput;
                await execPromise(`docker rm -f ${containerId}`);
                return;
            }

            const testbenchNormalized = testbenchPathDecode.replace(/\\/g, "/");

            const vFilesWithoutTestbench = vFiles.filter(
                (f) => f.replace(/\\/g, "/") !== testbenchNormalized,
            );

            const svFilesString = vFilesWithoutTestbench
                .map((f) => `"${f.replace(/\\/g, "/")}"`)
                .join(" ");

            const icarusCommand = `
                cd /workspace && \
                mkdir -p ${simDirPath} && \
                iverilog -o ${simDirPath}/a.out ${svFilesString} ${testbenchPathDecode} && \
                vvp ${simDirPath}/a.out | tee ${outputFile}
            `.replace(/\n/g, " ");

            const simulation = spawn("docker", [
                "exec",
                containerId,
                "bash",
                "-c",
                icarusCommand,
            ]);

            for await (const chunk of simulation.stdout) {
                yield {
                    type: "info",
                    content: `[stdout] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            for await (const chunk of simulation.stderr) {
                yield {
                    type: "error",
                    content: `[stderr] ${chunk.toString()} \n`,
                } satisfies SimulationOutput;
            }

            yield {
                type: "info",
                content: `✅ Simulation with Icarus Verilog finished.`,
            } satisfies SimulationOutput;

            await execPromise(`docker rm -f ${containerId}`);
        });
}

export async function getAllFilesByExtension(
    dir: string,
    fileExtension: string,
    baseDir = dir,
): Promise<string[]> {
    const entries = await promises.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                return getAllFilesByExtension(fullPath, fileExtension, baseDir);
            } else if (entry.isFile() && entry.name.endsWith(fileExtension)) {
                return [path.relative(baseDir, fullPath)];
            } else {
                return [];
            }
        }),
    );

    return files.flat();
}

async function transpileSvFile(svFilePath: string): Promise<string> {
    const form = new FormData();
    form.append("file", fs.createReadStream(svFilePath));

    const response = await axios.post(
        "http://localhost:8080/transpilation/transpile",
        form,
        {
            headers: form.getHeaders(),
            responseType: "text", // response is .cpp code
        },
    );

    return response.data; // obsah .cpp súboru ako string
}

function getLastFinishedSimulation() {
    return publicProcedure
        .input(
            z.object({
                repo: z.object({
                    tree: z.array(z.any()).optional(),
                    name: z.string(),
                    ownerName: z.string(),
                }),
            }),
        )
        .query(async ({ input }) => {
            if (!input.repo.tree) {
                console.log("❌ repo.tree is undefined");
                return null;
            }

            console.log("🧾 Full repo.tree dump:");
            input.repo.tree.forEach((item) => {
                console.log(
                    `${item.type}: ${item.name} - ${item.absolutePath}`,
                );
            });

            const simDirs = input.repo.tree.filter(
                (item): item is DirectoryItem =>
                    item.type === "directory" &&
                    /^sim_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/.test(
                        item.name,
                    ),
            );

            if (simDirs.length === 0) {
                console.log("❌ No sim directories found");
                return null;
            }

            const latestDir = simDirs.reduce((latest, current) =>
                new Date(current.lastActivity) > new Date(latest.lastActivity)
                    ? current
                    : latest,
            );

            console.log("✅ Found latest sim dir:");
            console.log(latestDir);

            const outputFile = latestDir.children.find(
                (item): item is FileDisplayItem =>
                    item.type === "file-display" && item.name === "output.txt",
            );

            if (!outputFile) {
                console.log("❌ output.txt not found in latest sim dir");
                return null;
            }

            const repoPath = absoluteRepoPath(
                input.repo.ownerName,
                input.repo.name,
            );

            const fullPath = path.join(repoPath, outputFile.absolutePath);

            return loadRepoFile(fullPath).content;
        });
}
