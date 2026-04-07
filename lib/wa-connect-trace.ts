"use server"

import { appendDebugSessionLog } from "@/lib/debug-session-log"

/** Client → server debug line without /api/* (fewer ad-blocker false positives). */
export async function waConnectTrace(
  entry: Record<string, unknown>
): Promise<void> {
  const ts =
    typeof entry.timestamp === "number" ? entry.timestamp : Date.now()
  await appendDebugSessionLog({
    ...entry,
    sessionId: "cfb0f4",
    timestamp: ts,
  })
}
