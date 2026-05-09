import { Megaphone, MapPin, Users } from "lucide-react";

interface Props {
  id: string;
  title: string;
  disasterType: string;
  location: string;
  severity: number;
  childrenAffected: number;
  totalAffected: number;
  status: "active" | "distributing" | "closed";
  createdAt: string;
}

const severityColor = (s: number) =>
  s >= 4 ? "bg-red-100 text-red-700" : s >= 3 ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-600";

const statusLabel = (s: string) =>
  s === "active" ? "Active" : s === "distributing" ? "Distributing" : "Closed";

export default function CampaignCard({
  id,
  title,
  disasterType,
  location,
  severity,
  childrenAffected,
  totalAffected,
  status,
  createdAt,
}: Props) {
  return (
    <a
      href={`/campaigns/${id}`}
      className="block rounded-lg border border-stone-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-stone-400" />
          <span className="font-semibold text-stone-900">{title}</span>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            status === "active" ? "bg-red-100 text-red-700" : status === "distributing" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-500"
          }`}
        >
          {statusLabel(status)}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-stone-500">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {childrenAffected.toLocaleString()} children · {totalAffected.toLocaleString()} total
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${severityColor(severity)}`}>
          Severity {severity}/5
        </span>
        <span className="text-xs text-stone-400">{disasterType}</span>
        <span className="ml-auto text-xs text-stone-400">{createdAt}</span>
      </div>
    </a>
  );
}
