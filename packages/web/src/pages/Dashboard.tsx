import {
  Activity,
  Users,
  Clock,
  AlertTriangle,
} from "lucide-react";
import StatCard from "../components/StatCard.js";
import CampaignCard from "../components/CampaignCard.js";

const mockCampaigns = [
  {
    id: "1",
    title: "Garut Flash Flood Response",
    disasterType: "Flood",
    location: "Garut, West Java",
    severity: 4,
    childrenAffected: 4200,
    totalAffected: 12500,
    status: "active" as const,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Jakarta Air Quality Crisis",
    disasterType: "Air Quality",
    location: "Jakarta DKI",
    severity: 3,
    childrenAffected: 18000,
    totalAffected: 45000,
    status: "distributing" as const,
    createdAt: "1 day ago",
  },
  {
    id: "3",
    title: "East Java Extreme Heat",
    disasterType: "Heatwave",
    location: "Surabaya, East Java",
    severity: 2,
    childrenAffected: 5600,
    totalAffected: 15000,
    status: "closed" as const,
    createdAt: "5 days ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Overview</h2>
        <p className="text-sm text-stone-500">
          Real-time disaster monitoring and emergency response status
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Campaigns"
          value={2}
          trend="up"
          sublabel="+1 in last 24h"
        />
        <StatCard
          label="Children Reached"
          value="27,800"
          sublabel="Across all tiers"
        />
        <StatCard
          label="Avg Response Time"
          value="14m"
          trend="down"
          sublabel="From disaster detection"
        />
        <StatCard
          label="NGO Partners"
          value={3}
          sublabel="2 provinces"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-900">
            Active Campaigns
          </h3>
          <a
            href="/campaigns"
            className="text-sm font-medium text-stone-500 hover:text-stone-900"
          >
            View all
          </a>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockCampaigns.map((c) => (
            <CampaignCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
