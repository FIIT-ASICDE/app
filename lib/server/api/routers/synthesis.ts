import { resolveRepoPath } from "@/lib/server/api/routers/repos";
import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";
import { SynthesisOutput } from "@/lib/types/editor";
import { exec, spawn } from "child_process";
import util from "util";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const execPromise = util.promisify(exec);

export const synthesisRouter = createTRPCRouter({
    runYosysStream: runYosysStream(),
});

function runYosysStream() {
    return publicProcedure
        .input(
            z.object({
                verilogFilePath: z
                    .string()
                    .min(1, "Verilog súbor musí mať názov.")
                    .nullable()
                    .optional(),
                repoId: z
                    .string()
                    .nullable()
                    .optional(),
                directory: z
                    .string()
                    .nullable()
                    .optional(),
            }),
        )
        .query(async function* ({ input, ctx }) {
            yield {
                type: "info",
                content: `Synthesis Yosys started.`,
            } satisfies SynthesisOutput;

            if(input.verilogFilePath == null || input.directory == null || input.repoId == null) {
                yield {
                    type: "error",
                    content: "Missing synthesis configuration",
                } satisfies SynthesisOutput;
                return;
            }

            const repoIdDecoded = decodeURIComponent(input.repoId);
            const verilogFilePath = decodeURIComponent(
                input.verilogFilePath,
            ).replace(/\\/g, "/");
            const directoryDecode = decodeURIComponent(input.directory);

            const absoluteRepoPath = await resolveRepoPath(
                ctx.prisma,
                repoIdDecoded,
            );
            const containerId = uuidv4();

            await execPromise(
                `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
            );

            const now = new Date();
            const synthesisDir = now.toISOString().replace(/[:.]/g, "-");
            const synDirPath = `${directoryDecode}/syn_${synthesisDir}`;
            const outputFile = `${synDirPath}/output.txt`;
            const outputVerilog = `${synDirPath}/output.v`;
            
            const yosysCommand = `
                cd /workspace && \
                mkdir -p ${synDirPath} && \
                yosys -p "read_verilog ${verilogFilePath}; synth; write_verilog ${outputVerilog}" | tee ${outputFile}
            `.replace(/\n/g, " ");

            const synthesis = spawn("docker", [
                "exec",
                containerId,
                "bash",
                "-c",
                yosysCommand,
            ]);

            for await (const chunk of synthesis.stdout) {
                console.log(chunk.toString());
                yield {
                    type: "info",
                    content: `[stdout] ${chunk.toString()} \n`,
                } satisfies SynthesisOutput;
            }

            for await (const chunk of synthesis.stderr) {
                console.log(chunk.toString());
                yield {
                    type: "error",
                    content: `[stderr] ${chunk.toString()} \n`,
                } satisfies SynthesisOutput;
            }

            yield {
                type: "info",
                content: `✅ Synthetis with Yosys finished.`,
            } satisfies SynthesisOutput;

            await execPromise(`docker rm -f ${containerId}`);
        });
}
