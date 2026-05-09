import { Search } from "lucide-react";
import CampaignCard from "../components/CampaignCard.js";

const allCampaigns = [
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
  {
    id: "4",
    title: "Central Java Landslide",
    disasterType: "Flood",
    location: "Banjarnegara, Central Java",
    severity: 3,
    childrenAffected: 1200,
    totalAffected: 3400,
    status: "closed" as const,
    createdAt: "2 weeks ago",
  },
];

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Campaigns</h2>
        <p className="text-sm text-stone-500">
          All emergency campaigns, past and present
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          placeholder="Search campaigns..."
          className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCampaigns.map((c) => (
          <CampaignCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
