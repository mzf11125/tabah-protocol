import { Hono } from "hono";

const app = new Hono();
const PORT = Number(process.env.PORT) || 3002;

interface Voucher {
  phoneHash: string;
  campaignId: string;
  amount: number;
  expiresAt: string;
  redeemed: boolean;
}

const activeVouchers: Map<string, Voucher> = new Map();

app.post("/webhook", async (c) => {
  const body = await c.req.json();
  const message = body.message?.toLowerCase() || "";
  const phoneHash = body.phoneHash || "unknown";

  if (message.startsWith("claim")) {
    const voucher: Voucher = {
      phoneHash,
      campaignId: "active",
      amount: 10,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      redeemed: false,
    };
    const voucherId = crypto.randomUUID().slice(0, 8);
    activeVouchers.set(voucherId, voucher);

    return c.json({
      type: "voucher",
      voucherId,
      amount: voucher.amount,
      message: `Your emergency aid voucher is ready. Voucher ID: ${voucherId}. Present at the nearest distribution point within 24 hours.`,
    });
  }

  if (message.startsWith("status")) {
    const voucherId = body.voucherId || "";
    const voucher = activeVouchers.get(voucherId);
    if (!voucher) {
      return c.json({ type: "error", message: "Voucher not found. Reply CLAIM to get a new voucher." });
    }
    return c.json({
      type: "status",
      redeemed: voucher.redeemed,
      expiresAt: voucher.expiresAt,
    });
  }

  if (message.startsWith("help")) {
    return c.json({
      type: "help",
      message:
        "Reply CLAIM to receive emergency aid voucher. Reply STATUS <voucher-id> to check your claim. Reply HELP to see this message.",
    });
  }

  return c.json({
    type: "unknown",
    message: "Reply HELP for instructions.",
  });
});

app.get("/health", (c) => c.json({ status: "ok" }));

console.log(`WhatsApp bot starting on port ${PORT}...`);

export default app;
