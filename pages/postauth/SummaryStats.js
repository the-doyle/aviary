const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function filterData(data) {
    let summedCategories = {} 

    for (let i = 0; i < data.length; i++) {
        data[i].type in summedCategories
            ? summedCategories[data[i].type] += parseInt(data[i].balance)
            : summedCategories[data[i].type] = parseInt(data[i].balance)
    }
    return summedCategories
}

function sumList(list) {
    return list.reduce((partialSum, a) => partialSum + a, 0);
}

export default function SummaryStats(props) {
    return props.assets && props.liabilities && props.lastCheckIn && props.numGoals ? (
        <div className='-mx-3'>
            <dl className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-500">Net worth</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 inline-block">{formatter.format(
                        sumList(Object.values(filterData(props.assets))) - sumList(Object.values(filterData(props.liabilities)))
                    )}</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-500">Last check-in</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 inline-block">{props.lastCheckIn}</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-3 lg:px-4 py-3 lg:py-5 shadow">
                    <dt className="truncate text-sm font-medium text-slate-500">Goals</dt>
                    <dd className="mt-1 text-2xl lg:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 inline-block">{props.numGoals}</dd>
                </div>
            
            </dl>
        </div>
    ) : null
}
