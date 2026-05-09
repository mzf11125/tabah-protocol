export default function Partners() {
  const partners = [
    {
      name: "Telaga Charity",
      region: "West Java",
      stations: 5,
      campaignsJoined: 3,
      status: "active",
    },
    {
      name: "Dompet Dhuafa",
      region: "Jakarta",
      stations: 2,
      campaignsJoined: 1,
      status: "onboarding",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900">NGO Partners</h2>
        <p className="text-sm text-stone-500">
          Organizations deploying Tabah Network stations and distributing aid
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-stone-500">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Stations</th>
              <th className="px-4 py-3 font-medium">Campaigns</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.name} className="border-b border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{p.name}</td>
                <td className="px-4 py-3 text-stone-500">{p.region}</td>
                <td className="px-4 py-3 text-stone-600">{p.stations}</td>
                <td className="px-4 py-3 text-stone-600">{p.campaignsJoined}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
