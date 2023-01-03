import { useState } from "react";
import { XCircleIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import SearchSelectInput from "./SearchSelectInput";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

const assetTypes = ['Cash', 'Pre-tax investments', 'Post-tax investments', 'Property']

export default function Accounts() {
    const supabase = useSupabaseClient() 
    const user = useUser()

    //#region state variables
    const [assets, setAssets] = useState(null);
    const [liabilities, setLiabilities] = useState(null);
    //#endregion
    
    //#region asset functions
    const getAssets = async () => {
        // await fetch(`/api/assets/${user.id}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setAssets(data)
        //     })

        const {data: getAssetsData, error: getAssetsError} = await supabase
            .from('assets')
            .select('*')
            .eq('user_id', user.id)

        setAssets(getAssetsData)
    }

    const addAsset = async () => {
        setAssets([
            ...assets,
            {
                id: uuidv4(), 
                user_id: user.id,
                name: "New asset", 
                type: "Cash", 
                balance: 0, 
            },
        ]);
    };

    const saveAssets = async () => {
        const { data: upsertAssetsData, error: upsertAssetsError } = await supabase
            .from('assets')
            .upsert(assets)
    }
    
    const editAsset = (e, id) => {
        const { name, value } = e.target
        const list = [...assets]
        let strippedValue = value

        if (name == "balance") {
            strippedValue = value.replace("$", "")
            strippedValue = strippedValue.replaceAll(',', '')
        }
        
        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = strippedValue
                break
            }
        }
    
        setAssets(list);
    };

    const editAssetType = (name, value, id) => {
        const list = [...assets]
        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = value
                break
            }
        }
        setAssets(list)
    };

    const deleteAsset = async (id) => {
        const list = [...assets];

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break
            }
        }

        setAssets(list);

        const { data: deleteAssetData, error: deleteAssetError } = await supabase
            .from('assets')
            .delete()
            .eq('id', id)
    };
    //#endregion
    
    //#region liability functions
            
    const addLiability = () => {
        setLiabilities([
            ...liabilities,
            { id: liabilities.length + 1, name: "New liability", type: "", balance: 0, 
            },
        ]);
    };

    const addThreeLiabilities = () => {
        setLiabilities([
            ...liabilities,
            { id: liabilities.length + 1, name: "New liability", type: "", balance: 0, 
            },
            { id: liabilities.length + 2, name: "New liability", type: "", balance: 0, 
            },
            { id: liabilities.length + 3, name: "New liability", type: "", balance: 0, 
            },
        ]);
    };

    const saveLiabilities = async () => {
        return 
    }
    
    const editLiability = (e, index) => {
        const { name, value } = e.target;
        const list = [...liabilities];

        if (name == "balance") {
            let strippedBalance = value.replace("$", "")
            strippedBalance = strippedBalance.replaceAll(',', '')
            list[index][name] = strippedBalance
        } else {
            list[index][name] = value;
        }
    
        setLiabilities(list);
    };

    const deleteLiability = (i) => {
        const list = [...liabilities];
        list.splice(i, 1);
        setLiabilities(list);
    };
    //#endregion 
    
    useEffect(() => {
        if (user) {
            getAssets() 
        }
        
    }, [user])

    return (
        <>
            <div id='assets' className='col-span-4 lg:col-span-2'>
                <h1 className="inline-flex items-center text-xl font-semibold text-gray-900">Assets</h1>
                <div className="mt-6 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-400'>
                                    <tr>
                                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="py-2 pr-6 text-left text-sm font-semibold text-gray-900">
                                            Type
                                        </th>
                                        <th scope="col" className="py-2 pr-6 text-right text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>

                                        <th scope="col" className="relative py-2 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {assets ? assets.map((asset) => (
                                    <tr key={asset.id}>
                                        <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">
                                                <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"   
                                                        className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                        value={asset.name}
                                                        onChange={(e) => editAsset(e, asset.id)}
                                                    />  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">
                                                <div className="mt-1 focus-within:border-slate-600">
                                                    <SearchSelectInput 
                                                        handleChange={editAssetType} 
                                                        items={assetTypes} 
                                                        selected={asset.type} 
                                                        id={asset.id}
                                                        name='item'
                                                     />  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-2 px-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">

                                                <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                    <input
                                                        type="text"
                                                        name="balance"
                                                        id="balance"
                                                        className="block w-full text-right border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                        value={asset.balance ? formatter.format(asset.balance) : formatter.format(0)}
                                                        onChange={(e) => editAsset(e, asset.id)}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="relative whitespace-nowrap pt-1 pl-2 text-sm font-medium">
                                            <button 
                                                href="#" 
                                                className="text-slate-300 hover:text-slate-500"
                                                onClick={() => deleteAsset(asset.id)}
                                            >
                                                <XCircleIcon className='h-6 rounded-full'/><span className="sr-only">, {asset.id}</span>
                                            </button>
                                        </td>
                                    </tr>
                                )) : null }
                                </tbody>
                            </table>

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className="group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={saveAssets}
                                >
                                    Save
                                    <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={addAsset}
                                >
                                    New
                                    <PlusIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-span-4 lg:col-span-2'>
                Charts here
            </div>

            <div id='liabilities' className='mt-20 col-span-4 lg:col-span-2'>
                <h1 className="inline-flex items-center text-xl font-semibold text-gray-900">Liabilities</h1>
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
                                            Balance
                                        </th>

                                        <th scope="col" className="relative py-2 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {liabilities ? liabilities.map((account, i) => (
                                    <tr key={account.id}>
                                        <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">
                                                <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"   
                                                        className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                        value={account.name}
                                                        onChange={(e) => editLiability(e, i)}
                                                    />  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-2 px-3 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">

                                                <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                    <input
                                                        type="text"
                                                        name="balance"
                                                        id="balance"
                                                        className="block w-full text-right border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                        value={account.balance ? formatter.format(account.balance) : formatter.format(0)}
                                                        onChange={(e) => editLiability(e, i)}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="relative whitespace-nowrap py-2 pl-3 text-sm font-medium">
                                            <button 
                                                href="#" 
                                                className="text-slate-300 hover:text-slate-500"
                                                onClick={() => deleteLiability(i)}
                                            >
                                                <XCircleIcon className='h-6 rounded-full'/><span className="sr-only">, {account.id}</span>
                                            </button>
                                        </td>
                                    </tr>
                                )) : null}
                                </tbody>
                            </table>

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className="group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={saveLiabilities}
                                >
                                    Save
                                    <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={addAsset}
                                >
                                    New
                                    <PlusIcon className='ml-1 h-4 rounded-full'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-0 lg:mt-20 col-span-4 lg:col-span-2'>
                Charts here
            </div>
        </>
    )
}