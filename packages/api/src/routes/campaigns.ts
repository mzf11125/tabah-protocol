import { Hono } from "hono";

const campaigns = new Hono();

campaigns.get("/", (c) =>
  c.json([
    {
      id: "1",
      title: "Garut Flash Flood Response",
      disasterType: "flood",
      severity: 4,
      location: "Garut, West Java",
      childrenAffected: 4200,
      totalAffected: 12500,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Jakarta Air Quality Crisis",
      disasterType: "air_quality",
      severity: 3,
      location: "Jakarta DKI",
      childrenAffected: 18000,
      totalAffected: 45000,
      status: "distributing",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ])
);

campaigns.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({
    id,
    title: "Emergency Campaign",
    status: "active",
    tiers: {
      tier1: { claims: 2400, allocated: 28800 },
      tier2: { claims: 890, allocated: 19200 },
    },
  });
});

export default campaigns;
