import { useParams } from "react-router-dom";

export default function CampaignDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <a
        href="/campaigns"
        className="inline-flex text-sm text-stone-500 hover:text-stone-900"
      >
        &larr; Back to campaigns
      </a>
      <div>
        <h2 className="text-xl font-bold text-stone-900">Campaign #{id}</h2>
        <p className="text-sm text-stone-500">
          Detailed view with tier breakdown, beneficiary stats, and transaction
          history.
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-xs font-medium text-stone-500">Tier 1 (Emergency)</div>
            <div className="mt-1 text-2xl font-bold text-stone-900">2,400</div>
            <div className="text-xs text-stone-400">claims · no DID required</div>
          </div>
          <div>
            <div className="text-xs font-medium text-stone-500">Tier 2 (Priority)</div>
            <div className="mt-1 text-2xl font-bold text-stone-900">890</div>
            <div className="text-xs text-stone-400">claims · DID verified</div>
          </div>
          <div>
            <div className="text-xs font-medium text-stone-500">Total Distributed</div>
            <div className="mt-1 text-2xl font-bold text-stone-900">$48K</div>
            <div className="text-xs text-stone-400">across both tiers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
