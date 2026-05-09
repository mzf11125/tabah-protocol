export type DisasterType = "flood" | "earthquake" | "heatwave" | "storm" | "air_quality";

export type Severity = 1 | 2 | 3 | 4 | 5;

export interface DisasterEvent {
  id: string;
  type: DisasterType;
  severity: Severity;
  location: {
    province: string;
    regency: string;
    district?: string;
    lat?: number;
    lng?: number;
  };
  timestamp: number;
  description: string;
  sources: string[];
  childrenAffected?: number;
  totalAffected?: number;
  confidence: number;
}

export interface SourceResult {
  sourceName: string;
  rawData: unknown;
  parsed: Partial<DisasterEvent>;
  fetchedAt: number;
}

export interface VerificationResult {
  event: DisasterEvent;
  crossRefScore: number;
  matchedSources: number;
  totalSources: number;
  passed: boolean;
}

export interface CampaignSpec {
  title: string;
  disasterType: DisasterType;
  severity: Severity;
  location: string;
  childrenAffected: number;
  totalAffected: number;
  targetAmount: number;
  tier1Allocation: number;
  tier2Allocation: number;
  sourceAttestation: string;
}
