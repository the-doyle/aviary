import { useState } from "react";
import { XCircleIcon, ArrowPathIcon, PlusIcon, CheckBadgeIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import SearchSelectInput from "./SearchSelectInput";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import LoadingTableBody from "./LoadingTableBody";
import EmptyTableBody from "./EmptyTableBody";
import EmptyChartBody from "./EmptyChartBody";
import Donut from "../charts/Donut";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function filterData(data) {
    let summedCategories = {} 

    for (let i = 0; i < data.length; i++) {
        data[i].type in summedCategories
            ? summedCategories[data[i].type] += data[i].balance
            : summedCategories[data[i].type] = data[i].balance
    }

    return summedCategories
}

const assetTypes = ['Cash', 'Pre-tax investment', 'Post-tax investment', 'Property', 'Vehicle', 'Other']
const liabilityTypes = ['Mortage', 'Student loan', 'Auto loan', 'Credit card', 'Other']

export default function Accounts() {
    const supabase = useSupabaseClient() 
    const user = useUser()

     //#region secondary state variables
     const [assets, setAssets] = useState(null);
     const [liabilities, setLiabilities] = useState(null);
     //#endregion
    
    //#region asset functions
    const getAssets = async () => {
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
        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>
        })

        const { data: upsertAssetsData, error: upsertAssetsError } = await supabase
            .from('assets')
            .upsert(assets)

        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>
        })

        await timeout(1300);

        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
        })
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

    const editAssetType = (value, name, id) => {
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
    const getLiabilities = async () => {
        const {data: getLiabilitiesData, error: getLiabilitiesError} = await supabase
            .from('liabilities')
            .select('*')
            .eq('user_id', user.id)

        setLiabilities(getLiabilitiesData)
    }

    const addLiability = async () => {
        setLiabilities([
            ...liabilities,
            {
                id: uuidv4(), 
                user_id: user.id,
                name: "New liability", 
                type: "Mortgage", 
                balance: 0, 
            },
        ]);
    };

    const saveLiabilities = async () => {
        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>
        })

        const { data: upsertLiabilitiesData, error: upsertLiabilitiesError } = await supabase
            .from('liabilities')
            .upsert(liabilities)

        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>
        })

        await timeout(1300);

        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
        })
    }
    
    const editLiability = (e, id) => {
        const { name, value } = e.target
        const list = [...liabilities]
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
    
        setLiabilities(list);
    };

    const editLiabilityType = (value, name, id) => {

        const list = [...liabilities]
        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list[i][name] = value
                break
            }
        }
        setLiabilities(list)
    };

    const deleteLiability = async (id) => {
        const list = [...liabilities];

        for (let i=0; i<list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break
            }
        }

        setLiabilities(list);

        const { data: deleteLiabilityData, error: deleteLiabilityError } = await supabase
            .from('liabilities')
            .delete()
            .eq('id', id)
    };
    //#endregion
    
    //#region secondary state variables
    const [saveAssetsButton, setSaveAssetsButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
    })
    const [saveLiabilitiesButton, setSaveLiabilitesButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>
    })
    //#endregion

    useEffect(() => {
        if (user) {
            getAssets() 
            getLiabilities() 
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
                                        <th scope="col" className="py-2 pr-1.5 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
                                            Type
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {assets && assets.length > 0 ? assets.map((asset) => (
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
                                                        name='type'
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
                                )) : assets 
                                        ? <EmptyTableBody message="No assets yet" icon={FaceFrownIcon} /> 
                                        : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveAssetsButton.className}
                                onClick={saveAssets}
                                >
                                    Save
                                    {saveAssetsButton.icon}
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
                <div className='flex justify-center'>
                    <div className='w-1/2'>
                        {assets && assets.length > 0 
                            ? <Donut data={filterData(assets)} label="$"/>
                            : <EmptyChartBody message="Add assets to see this chart" /> 
                        }   
                    </div>
                </div>    
            </div>

            <div id='liabilities' className='mt-20 col-span-4 lg:col-span-2'>
                <h1 className="inline-flex items-center text-xl font-semibold text-gray-900">Liabilities</h1>
                <div className="mt-6 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-400'>
                                    <tr>
                                        <th scope="col" className="py-2 pr-1.5 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
                                            Type
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {liabilities && liabilities.length > 0 ? liabilities.map((liability) => (
                                    <tr key={liability.id}>
                                        <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">
                                                <div className="mt-1 border-b border-slate-200 focus-within:border-slate-600">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"   
                                                        className="block w-full border-0 border-b border-transparent focus:border-slate-600 focus:ring-0 text-sm text-slate-600 focus:text-slate-800"
                                                        value={liability.name}
                                                        onChange={(e) => editLiability(e, liability.id)}
                                                    />  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-2 text-sm text-gray-500">
                                            <div className="relative mt-1 rounded-md">
                                                <div className="mt-1 focus-within:border-slate-600">
                                                    <SearchSelectInput 
                                                        handleChange={editLiabilityType} 
                                                        items={liabilityTypes} 
                                                        selected={liability.type} 
                                                        id={liability.id}
                                                        name='type'
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
                                                        value={liability.balance ? formatter.format(liability.balance) : formatter.format(0)}
                                                        onChange={(e) => editLiability(e, liability.id)}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="relative whitespace-nowrap pt-1 pl-2 text-sm font-medium">
                                            <button 
                                                href="#" 
                                                className="text-slate-300 hover:text-slate-500"
                                                onClick={() => deleteLiability(liability.id)}
                                            >
                                                <XCircleIcon className='h-6 rounded-full'/><span className="sr-only">, {liability.id}</span>
                                            </button>
                                        </td>
                                    </tr>
                                )) : liabilities 
                                        ? <EmptyTableBody message="No liabilities yet" icon={FaceSmileIcon} /> 
                                        : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveLiabilitiesButton.className}
                                onClick={saveLiabilities}
                                >
                                    Save
                                    {saveLiabilitiesButton.icon}
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-gray-300 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-slate-100 focus:outline-none"
                                onClick={addLiability}
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
                <div className='flex justify-center'>
                    <div className='w-1/2'>
                        {liabilities && liabilities.length > 0 
                            ? <Donut data={filterData(liabilities)} label="$"/>
                            : <EmptyChartBody message="Add liabilties to see this chart" /> 
                        }   
                    </div>
                </div>
            </div>
        </>
    )
}