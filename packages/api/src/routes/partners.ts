import { Hono } from "hono";

const partners = new Hono();

partners.get("/", (c) =>
  c.json([
    {
      id: "1",
      name: "Telaga Charity",
      region: "West Java",
      stations: 5,
      campaignsJoined: 3,
      status: "active",
    },
    {
      id: "2",
      name: "Dompet Dhuafa",
      region: "Jakarta",
      stations: 2,
      campaignsJoined: 1,
      status: "onboarding",
    },
  ])
);

export default partners;
