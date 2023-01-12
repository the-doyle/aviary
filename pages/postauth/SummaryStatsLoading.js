export default function SummaryStatsLoading() {
    return (
        <div className='-mx-3'>
            <dl className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-slate-50 animate-pulse px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-50">Loading</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-slate-50 inline-block">Loading</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-slate-50 animate-pulse px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-50">Loading</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-slate-50 inline-block">Loading</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-slate-50 animate-pulse px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-50">Loading</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-slate-50 inline-block">Loading</dd>
                </div>
            
            </dl>
        </div>
    )
}