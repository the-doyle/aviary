import { useState } from "react";
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'

const formatter = new Intl.NumberFormat('en-US', {
    // style: 'currency',
    // currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export default function Accounts() {
    const [assets, setAssets] = useState([
        { id: 1, name: "Schwab Taxable", type: "taxable", balance: 120000 },
    ]);
    
    const addAsset = () => {
        setAssets([
            ...assets,
            { id: assets.length + 1, name: "New account", type: "", balance: 0, 
            },
        ]);
    };
    
    const editAsset = (e, index) => {
        const { name, value } = e.target;
        const list = [...assets];
        list[index][name] = value;
        setAssets(list);
    };

    return (
        <div className="col-span-4 lg:col-span-2 md:col-span-3">
            <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Assets</h1>
                <p className="mt-2 text-sm text-gray-700">
                Investments, property, cash, etc. 
                </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:w-auto"
                onClick={addAsset}
                >
                    New account
                    {/* <CurrencyDollarIcon className="pl-2 h-6 w-6 "/> */}

                </button>
            </div>
            </div>
            <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-4 md:px-6 lg:px-8">
                    <table className="min-w-full divide-none border-collapse">
                        <thead className='border-b border-gray-900'>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                    >
                                    Name
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Balance
                                </th>

                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-none">
                        {assets.map((account, i) => (
                            <tr key={account.id}>
                                <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                    <div className="relative mt-1 rounded-md">
                                        <div className="mt-1 border-b border-gray-300 focus-within:border-slate-600">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 sm:text-sm text-slate-600 focus:text-slate-800"
                                                value={account.name}
                                                onChange={(e) => editAsset(e, i)}
                                            />  
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap py-2 px-3 text-sm text-gray-500">
                                    <div className="relative mt-1 rounded-md">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>

                                        <div className="mt-1 border-b border-gray-300 focus-within:border-slate-600">
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                className="block w-full pl-7 pr-12 border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 sm:text-sm text-slate-600 focus:text-slate-800"
                                                value={formatter.format(account.balance)}
                                                onChange={(e) => editAsset(e, i)}
                                                aria-describedby="price-currency"
                                            />
                                        </div>

                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                USD
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="relative whitespace-nowrap py-2 pl-3 text-right text-sm font-medium">
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        <XMarkIcon className='h-5'/><span className="sr-only">, {account.id}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    )
}
