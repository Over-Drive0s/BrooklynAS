import { spawn, execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clean = process.argv.includes("--clean");

function killPort(port) {
  try {
    const output = execSync(`lsof -ti:${port} 2>/dev/null || true`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!output) return;

    for (const pid of output.split("\n")) {
      const id = Number(pid);
      if (!Number.isNaN(id) && id !== process.pid) {
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

function killProjectDevServers() {
  try {
    const output = execSync("ps aux 2>/dev/null || true", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    for (const line of output.split("\n")) {
      if (!line.includes("next dev") && !line.includes("next-server")) continue;
      if (!line.includes(root)) continue;

      const parts = line.trim().split(/\s+/);
      const pid = Number(parts[1]);
      if (!Number.isNaN(pid) && pid !== process.pid) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
          // Process may already be gone.
        }
      }
    }
  } catch {
    // ps unavailable; port cleanup below is still enough.
  }

  for (const port of [3000, 3001, 3002]) {
    killPort(port);
  }
}

killProjectDevServers();

if (clean) {
  const nextDir = path.join(root, ".next");
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
    console.log("Cleared .next cache");
  }
}

console.log("Starting dev server at http://localhost:3000");

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "dev", "--port", "3000"], {
  cwd: root,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
