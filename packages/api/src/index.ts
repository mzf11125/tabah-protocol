import { Hono } from "hono";
import { cors } from "hono/cors";
import campaigns from "./routes/campaigns.js";
import claims from "./routes/claims.js";
import partners from "./routes/partners.js";
import oracle from "./routes/oracle.js";

const app = new Hono();

app.use("/*", cors());

app.get("/health", (c) => c.json({ status: "ok", service: "tabah-api" }));

app.route("/campaigns", campaigns);
app.route("/claims", claims);
app.route("/partners", partners);
app.route("/oracle", oracle);

export default app;
