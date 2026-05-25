import { spawn, execSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync, readFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fast = process.argv.includes("--fast");
const pidFile = path.join(root, ".dev-server.pid");
const port = 3000;

function sleep(ms) {
  try {
    execSync(`sleep ${Math.max(0.1, ms / 1000)}`, { stdio: "ignore" });
  } catch {
    // Ignore.
  }
}

function killPort(targetPort) {
  try {
    const output = execSync(`lsof -ti:${targetPort} 2>/dev/null || true`, {
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
  if (existsSync(pidFile)) {
    const oldPid = Number(readFileSync(pidFile, "utf8").trim());
    if (!Number.isNaN(oldPid) && oldPid !== process.pid) {
      try {
        process.kill(oldPid, "SIGKILL");
      } catch {
        // Process may already be gone.
      }
    }
    unlinkSync(pidFile);
  }

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

  for (const targetPort of [3000, 3001, 3002]) {
    killPort(targetPort);
  }

  sleep(500);
}

function clearNextDir() {
  const nextDir = path.join(root, ".next");
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
  }
}

function clearDevCacheOnly() {
  const nextDir = path.join(root, ".next");
  if (!existsSync(nextDir)) return;

  for (const dir of ["cache", "static/development", "server"]) {
    const target = path.join(nextDir, dir);
    if (existsSync(target)) {
      rmSync(target, { recursive: true, force: true });
    }
  }
}

killProjectDevServers();

if (fast) {
  clearDevCacheOnly();
  console.log("Fast start: cleared dev cache only");
} else {
  clearNextDir();
  console.log("Clean start: cleared .next");
}

writeFileSync(pidFile, String(process.pid));

console.log(`Starting dev server at http://127.0.0.1:${port}`);

const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(
  process.execPath,
  [nextBin, "dev", "--turbo", "--port", String(port), "--hostname", "127.0.0.1"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      CHOKIDAR_USEPOLLING: "1",
      WATCHPACK_POLLING: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  }
);

function cleanup() {
  try {
    if (existsSync(pidFile)) unlinkSync(pidFile);
  } catch {
    // Ignore cleanup errors.
  }
}

child.on("exit", (code) => {
  cleanup();
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
  cleanup();
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
  cleanup();
});
