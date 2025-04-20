import fs from "fs/promises";
import path from "path";
import { parseAndCollectSymbols } from "@/app/antlr/SystemVerilog/parseAndCollectSymbols";

const supportedExtensions = [".sv", ".v", ".svh"];

export async function indexRepositorySymbols(repoPath: string, virtualPrefix: string) {
    async function walk(currentDir: string) {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
  
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (supportedExtensions.includes(path.extname(entry.name))) {
          try {
            const code = await fs.readFile(fullPath, "utf-8");
            const relativePath = path.relative(repoPath, fullPath).replace(/\\/g, "/");
  
            const virtualPath = `${virtualPrefix}/${relativePath}`;
            const uri = encodeURI(`inmemory://${virtualPath}`).toLowerCase();
            
            parseAndCollectSymbols(code, uri);

          } catch (err) {
            console.warn(`[SymbolIndex] Failed to parse ${fullPath}:`, err);
          }
        }
      }
    }
  
    await walk(repoPath);
    //symbolTableManager.debug();
  }
  