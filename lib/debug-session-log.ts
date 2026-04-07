import { appendFile } from "fs/promises"
import path from "path"

const LOG_BASENAME = "debug-cfb0f4.log"

function logDir(): string {
  return process.env.INIT_CWD ?? process.cwd()
}

/** Dev-only NDJSON line for debug sessions (no secrets). */
export async function appendDebugSessionLog(
  entry: Record<string, unknown>
): Promise<void> {
  if (process.env.NODE_ENV !== "development") return
  const line =
    JSON.stringify({
      ...entry,
      timestamp: entry.timestamp ?? Date.now(),
    }) + "\n"
  try {
    await appendFile(path.join(logDir(), LOG_BASENAME), line, "utf8")
  } catch (e) {
    console.error("[debug-session-log] append failed:", logDir(), e)
  }
}
