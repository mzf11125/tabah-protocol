import type { SourceResult, DisasterType } from "../types.js";

const BMKG_API = "https://data.bmkg.go.id/";

export interface BMKGReport {
  type: string;
  magnitude?: number;
  location?: string;
  depth?: number;
  time?: string;
}

export async function fetchBMKG(): Promise<SourceResult> {
  try {
    const res = await fetch(`${BMKG_API}latest.json`);
    if (!res.ok) throw new Error(`BMKG API error: ${res.status}`);
    const raw = await res.json();
    return {
      sourceName: "BMKG",
      rawData: raw,
      parsed: parseBMKG(raw),
      fetchedAt: Date.now(),
    };
  } catch (err) {
    return {
      sourceName: "BMKG",
      rawData: null,
      parsed: {},
      fetchedAt: Date.now(),
    };
  }
}

function parseBMKG(raw: unknown): Partial<SourceResult["parsed"]> {
  // Placeholder: parse BMKG JSON format
  return {};
}
