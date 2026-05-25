import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function killProjectDevServers() {
  try {
    const output = execSync("ps aux 2>/dev/null || true", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    for (const line of output.split("\n")) {
      const isDevProcess =
        line.includes("next dev") ||
        line.includes("next-server") ||
        line.includes("scripts/dev.mjs") ||
        line.includes("npm exec next dev");

      if (!isDevProcess) continue;
      if (!line.includes(root)) continue;

      const pid = Number(line.trim().split(/\s+/)[1]);
      if (!Number.isNaN(pid)) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
          // Process may already be gone.
        }
      }
    }
  } catch {
    // Ignore and continue with build.
  }

  for (const port of [3000, 3001, 3002]) {
    try {
      const pids = execSync(`lsof -ti:${port} 2>/dev/null || true`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();

      if (!pids) continue;

      for (const pid of pids.split("\n")) {
        const id = Number(pid);
        if (!Number.isNaN(id)) {
          try {
            process.kill(id, "SIGKILL");
          } catch {
            // Process may already be gone.
          }
        }
      }
    } catch {
      // No processes on this port.
    }
  }
}

killProjectDevServers();
