interface Props {
  label: string;
  value: string | number;
  trend?: "up" | "down";
  sublabel?: string;
}

export default function StatCard({ label, value, trend, sublabel }: Props) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="text-xs font-medium text-stone-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-stone-900">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend === "up" ? "text-red-600" : "text-green-600"
            }`}
          >
            {trend === "up" ? "+" : "-"}
          </span>
        )}
      </div>
      {sublabel && <div className="mt-1 text-xs text-stone-400">{sublabel}</div>}
    </div>
  );
}
