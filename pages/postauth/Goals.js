import { useState } from "react";
import { XCircleIcon } from '@heroicons/react/24/outline'
import GoalsSearchSelectInput from "./SearchSelectInput";
import GoalProgressBar from "./GoalProgressBar";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export default function Goals() {
    //#region state variables
    const [assets, setAssets] = useState([
        { id: 1, name: "Schwab Taxable", type: "taxable", balance: 450000 },
        { id: 1, name: "Schwab Roth IRAs", type: "taxable", balance: 35000 },
        { id: 1, name: "Primary Home", type: "taxable", balance: 750000 },
    ]);

    const [liabilities, setLiabilities] = useState([
        { id: 1, name: "Credit card", type: "debt", balance: 3500 },
    ]);

    const [goals, setGoals] = useState([
        { id: 1, name: "Taxable", account: "Schwab Taxable", type: "long", target: 2350000 },
        { id: 1, name: "Roth IRAs", account: "Schwab Roth IRAs", type: "long", target: 150000 },
    ]);
    //#endregion

    //#region goal functions 
    const addGoal = () => {
        setGoals([
            ...goals,
            { id: goals.length + 1, name: "New goal", account: "Schwab Taxable", type: "", target: 0, },
        ]);
    };

    const addThreeGoals = () => {
        setGoals([
            ...goals,
            { id: goals.length + 1, name: "New goal", account: "Schwab Taxable", type: "", target: 0, },
            { id: goals.length + 2, name: "New goal", account: "Schwab Taxable", type: "", target: 0, },
            { id: goals.length + 3, name: "New goal", account: "Schwab Taxable", type: "", target: 0, },
        ]);
    };
    
    const editGoal = (e, index) => {
        const { name, value } = e.target;
        const list = [...goals];

        if (name == "target") {
            let strippedTarget = value.replace("$", "")
            strippedTarget = strippedTarget.replaceAll(',', '')
            list[index][name] = strippedTarget
        } else {
            list[index][name] = value;
        }
    
        setGoals(list);
    };

    const deleteGoal = (i) => {
        const list = [...goals];
        list.splice(i, 1);
        setGoals(list);
    };
    //#endregion 

    //#region misc functions 
    function calculateProgress(goal) {
        // if (!goal.name || !goal.target || !goal.account) {
        //     return "0%"
        // }
        const balance = assets.find(x => x.name === goal.account).balance
        const progress = (balance / goal.target) * 100
        return progress > 100 ? "100%" : progress.toFixed(0) + "%"
    }
    //#endregion 

    return (
        <>
            <div id='goals' className='col-span-4 lg:col-span-2'>
                <div>
                <div className="flex items-center">
                        <div className="flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Goals</h1>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className='border-b border-slate-400'>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-2 text-left text-sm font-semibold text-gray-900"
                                                >
                                                Name
                                            </th>
                                            <th scope="col" className="py-2 pr-6 text-right text-sm font-semibold text-gray-900">
                                                Account
                                            </th>
                                            <th scope="col" className="py-2 pr-6 text-right text-sm font-semibold text-gray-900">
                                                Target balance
                                            </th>

                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-none">
                                    {goals.map((goal, i) => (
                                        <tr key={goal.id}>
                                            <td className="whitespace-nowrap py-2 pr-3 text-sm text-gray-500">
                                                <div className="relative mt-1 rounded-md">
                                                    <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"   
                                                            className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                            value={goal.name}
                                                            onChange={(e) => editGoal(e, i)}
                                                        />  
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                                <div className="relative mt-1 rounded-md">
                                                    <div className="mt-1">
                                                        <GoalsSearchSelectInput assets={assets} selected={assets[0]} />  
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-2 px-3 text-sm text-gray-500">
                                                <div className="relative mt-1 rounded-md">
                                                    <div className="mt-1 border-b border-slate-300 focus-within:border-slate-600">
                                                        <input
                                                            type="text"
                                                            name="target"
                                                            id="target"
                                                            className="block w-full text-right border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                            value={goal.target ? formatter.format(goal.target) : formatter.format(0)}
                                                            onChange={(e) => editGoal(e, i)}
                                                            min={0}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="relative whitespace-nowrap py-2 pl-3 text-sm font-medium">
                                                <button 
                                                    href="#" 
                                                    className="text-slate-300 hover:text-slate-600"
                                                    onClick={() => deleteGoal(i)}
                                                >
                                                    <XCircleIcon className='h-6 rounded-full'/><span className="sr-only">, {goal.id}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <div className="mt-4 text-right">
                                    <button
                                    type="button"
                                    className="group inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none"
                                    onClick={addGoal}
                                    >
                                        Add 1
                                    </button>
                                    <button
                                    type="button"
                                    className="ml-2 group inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none"
                                    onClick={addThreeGoals}
                                    >
                                        Add 3
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-0 lg:mt-24 col-span-4 lg:col-span-2'>
                {goals.map((goal) => (
                    <div key={goal.id} className='pb-1'>
                        <GoalProgressBar progress={calculateProgress(goal)} goal={goal} />
                    </div>
                ))}
            </div>
        </>
    )
}