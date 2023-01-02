export default function GoalProgressBar(props) {
    return props.goal && props.progress ? (
        <div className='ml-0 lg:ml-10 mb-8 mt-0.5'>
            <h4 className="sr-only">Goal progress</h4>
            <h1 className='block lg:hidden mb-1 text-sm font-medium text-slate-400'>{props.goal.name}</h1>
            <div className="" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-5 rounded-full bg-gradient-to-r from-lime-400 to-green-600 text-green-100 text-xs font-semibold text-right pr-2 pt-0.5" style={{ width: props.progress }}>{props.progress}</div>
                </div>
            </div>
        </div>
    ) : null
}
  