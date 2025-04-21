import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";
import { resolveRepoPath } from "@/lib/server/api/routers/repos";
import { SynthesisOutput } from "@/lib/types/editor";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const synthesisRouter = createTRPCRouter({
    runYosysStream: runYosysStream(),
});

function runYosysStream() {
    return publicProcedure
        .input(
            z.object({
                testbenchPath: z.string().min(1, "Testbench súbor musí mať názov."),
                repoId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const repoIdDecoded = decodeURIComponent(input.repoId);
                const testbenchPathDecoded = decodeURIComponent(input.testbenchPath);

                const absoluteRepoPath = await resolveRepoPath(ctx.prisma, repoIdDecoded);
                const containerId = uuidv4();

                console.log("📁 Repo path:", absoluteRepoPath);
                console.log("📄 Testbench path:", testbenchPathDecoded);

                await execPromise(
                    `docker run -dit --name ${containerId} -v "${absoluteRepoPath}:/workspace" simulator-image`,
                );
                console.log(`✅ Docker container '${containerId}' started.`);

                const yosysProcess = spawn("docker", [
                    "exec", containerId, "bash", "-c",
                    `cd /workspace && yosys -p "read_verilog ${testbenchPathDecoded}; synth; write_verilog output.v"`
                ]);

                yosysProcess.stdout.on("data", (data) => {
                    console.log(`📤 STDOUT: ${data.toString()}`);
                });

                yosysProcess.stderr.on("data", (data) => {
                    console.error(`❌ STDERR: ${data.toString()}`);
                });

                yosysProcess.on("close", async (code) => {
                    console.log(`🔚 Yosys finished with exit code ${code}`);

                    // Optionally cleanup
                    await execPromise(`docker rm -f ${containerId}`);
                    console.log(`🧹 Docker container '${containerId}' removed.`);
                });

                return { status: "processing", containerId };

            } catch (error) {
                console.error("❌ Error during synthesis:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Chyba počas syntézy.",
                    cause: error,
                });
            }
        });
};