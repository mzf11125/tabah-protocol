import type { SourceResult, DisasterEvent, DisasterType, Severity, VerificationResult, CampaignSpec } from "../types.js";
import { fetchBMKG } from "../sources/bmkg.js";
import { fetchBNPB } from "../sources/bnpb.js";
import { fetchNews, searchNewsForDisaster } from "../sources/news.js";

export class DisasterDetector {
  private sources = [fetchBMKG, fetchBNPB];

  async detect(): Promise<DisasterEvent[]> {
    const results: DisasterEvent[] = [];

    const sourceResults = await Promise.allSettled(
      this.sources.map((fn) => fn())
    );

    const validResults = sourceResults
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<SourceResult>).value);

    const newsResults = await fetchNews();
    const allResults = [...validResults, ...newsResults.flat()];

    for (const result of allResults) {
      if (result.parsed.description) {
        const event = this.classify(result);
        if (event) results.push(event);
      }
    }

    return results;
  }

  private classify(source: SourceResult): DisasterEvent | null {
    const text = [
      source.parsed.description,
      ...(source.parsed.sources ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const disasterKeywords: Record<DisasterType, string[]> = {
      flood: ["banjir", "flood", "banjir bandang", "flooding"],
      earthquake: ["gempa", "earthquake", "seismic"],
      heatwave: ["heatwave", "heat wave", "gelombang panas", "suhu ekstrem"],
      storm: ["storm", "badai", "angin kencang", "puting beliung"],
      air_quality: ["polusi", "air quality", "kabut asap", "aqi"],
    };

    for (const [type, keywords] of Object.entries(disasterKeywords)) {
      if (keywords.some((kw) => text.includes(kw))) {
        return {
          id: crypto.randomUUID(),
          type: type as DisasterType,
          severity: this.estimateSeverity(text),
          location: { province: "", regency: "" },
          timestamp: source.fetchedAt,
          description: source.parsed.description ?? "",
          sources: source.parsed.sources ?? [],
          confidence: 0.5,
        };
      }
    }

    return null;
  }

  private estimateSeverity(text: string): Severity {
    const highWords = ["darurat", "emergency", "evacuation", "evakuasi", "critical", "meninggal"];
    const matches = highWords.filter((w) => text.includes(w)).length;
    if (matches >= 3) return 4;
    if (matches >= 1) return 3;
    return 2;
  }
}

export class EmergencyVerifier {
  async verify(event: DisasterEvent): Promise<VerificationResult> {
    const newsHits = await searchNewsForDisaster([
      event.type,
      event.location.province || "indonesia",
    ]);

    const matchedSources = newsHits.length;
    const totalSources = Math.max(matchedSources, 1);
    const crossRefScore = Math.min(matchedSources / 3, 1);

    return {
      event,
      crossRefScore,
      matchedSources,
      totalSources,
      passed: crossRefScore >= 0.5,
    };
  }
}

export class CampaignCreator {
  createSpec(event: DisasterEvent, verification: VerificationResult): CampaignSpec {
    const baseAmount = event.severity * 100000; // lamports equivalent
    const childrenRatio = 0.4; // children ~40% of affected

    return {
      title: `${event.type.charAt(0).toUpperCase() + event.type.slice(1)} Emergency - ${event.location.regency || event.location.province}`,
      disasterType: event.type,
      severity: event.severity,
      location: `${event.location.regency}, ${event.location.province}`,
      childrenAffected: Math.round((event.totalAffected ?? 1000) * childrenRatio),
      totalAffected: event.totalAffected ?? 1000,
      targetAmount: baseAmount,
      tier1Allocation: 60,
      tier2Allocation: 40,
      sourceAttestation: verification.event.id,
    };
  }
}
