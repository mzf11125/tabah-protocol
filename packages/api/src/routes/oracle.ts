import { Hono } from "hono";
import { DisasterDetector, EmergencyVerifier, CampaignCreator } from "@tabah/ai-oracle";

const oracle = new Hono();

oracle.post("/detect", async (c) => {
  const detector = new DisasterDetector();
  const verifier = new EmergencyVerifier();
  const creator = new CampaignCreator();

  const events = await detector.detect();
  const results = [];

  for (const event of events) {
    const verification = await verifier.verify(event);
    if (verification.passed) {
      const spec = creator.createSpec(event, verification);
      results.push({ event, verification, spec });
    }
  }

  return c.json({ eventsDetected: events.length, campaignsCreated: results });
});

oracle.get("/status", (c) =>
  c.json({
    status: "idle",
    lastPoll: new Date().toISOString(),
    sources: ["BMKG", "BNPB", "Antara News", "Reuters"],
  })
);

export default oracle;
