import type { SourceResult } from "../types.js";

const BNPB_API = "https://bnpb.go.id/api/";

export async function fetchBNPB(): Promise<SourceResult> {
  try {
    const res = await fetch(`${BNPB_API}disasters/latest`);
    if (!res.ok) throw new Error(`BNPB API error: ${res.status}`);
    const raw = await res.json();
    return {
      sourceName: "BNPB",
      rawData: raw,
      parsed: {},
      fetchedAt: Date.now(),
    };
  } catch {
    return {
      sourceName: "BNPB",
      rawData: null,
      parsed: {},
      fetchedAt: Date.now(),
    };
  }
}
