import { useState } from "react";
import { ArrowPathIcon, PlusIcon, CheckBadgeIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@supabase/auth-helpers-react";
import SearchSelectInput from "./SearchSelectInput";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import LoadingTableBody from "./LoadingTableBody";
import EmptyTableBody from "./EmptyTableBody";
import EmptyChartBody from "./EmptyChartBody";
import AssetsDonut from "../charts/AssetsDonut";
import SortButton from "./SortButton";
import DeleteButton from "./DeleteButton";

//#region helper functions
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
            ? summedCategories[data[i].type] += parseInt(data[i].balance)
            : summedCategories[data[i].type] = parseInt(data[i].balance)
    }

    return summedCategories
}

function sumList(list) {
    return list.reduce((partialSum, a) => partialSum + a, 0);
}

function getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}
//#endregion

//#region constants
const assetTypes = ['Cash', 'Pre-tax investment', 'Post-tax investment', 'Property', 'Vehicle', 'Other']
const liabilityTypes = ['Mortage', 'Student loan', 'Auto loan', 'Credit card', 'Other']
//#endregion

export default function Accounts(props) {
    const supabase = useSupabaseClient() 

     //#region state variables
     const [assets, setAssets] = useState(null);
     const [sortAssetsOn, setSortAssetsOn] = useState(['balance', true])
     const [liabilities, setLiabilities] = useState(null);
     const [sortLiabilitiesOn, setSortLiabilitiesOn] = useState(['balance', true])
     //#endregion
    
    //#region asset functions
    const getAssets = async () => {
        const {data: getAssetsData, error: getAssetsError} = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', props.user.id)
            .eq('class', 'asset')
            .order('balance', { ascending: false })

            setAssets(getAssetsData)
    }

    const sortAssets = (property, descending) => {
        setSortAssetsOn([property, descending])
    }

    const addAsset = async () => {
        setSortAssetsOn(['balance', true])
        setAssets([
            ...assets,
            {
                id: uuidv4(), 
                user_id: props.user.id,
                name: "New asset", 
                type: "Cash", 
                class: 'asset',
                balance: 0, 
            },
        ]);
    };

    const saveAssets = async () => {
        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>,
            text: 'Saving'
        })

        const { data: upsertAssetsData, error: upsertAssetsError } = await supabase
            .from('accounts')
            .upsert(assets)

        //filter assets down to necessary attributes 
        let asset_history = assets.map(({user_id, name, type, ...keepAttrs}) => keepAttrs)

        //add date attribute with today's date 
        asset_history = asset_history.map(obj => ({ ...obj, date: getDate() }))

        //upsert asset history 
        const { data: upsertAssetHistoryData, error: upsertAssetHistoryError } = await supabase
            .from('history')
            .upsert(asset_history)

        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Done'
        })

        await timeout(2000);

        setSaveAssetsButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Save'
        })
    }
    
    const editAsset = (e, id) => {
        const { name, value } = e.target
        const list = [...assets]
        let strippedValue = value

        if (name == "balance") {
            if (value && value != '$') {
                strippedValue = value.replace("$", "")
                strippedValue = strippedValue.replaceAll(',', '')
            } else {
                strippedValue = 0
            }
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
            .from('accounts')
            .delete()
            .eq('id', id)
    };
    //#endregion
    
    //#region liability functions
    const getLiabilities = async () => {
        const {data: getLiabilitiesData, error: getLiabilitiesError} = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', props.user.id)
            .eq('class', 'liability')
            .order('balance', { ascending: false })

        setLiabilities(getLiabilitiesData)
    }

    const sortLiabilities = (property, descending) => {
        setSortLiabilitiesOn([property, descending])
    }

    const addLiability = async () => {
        setSortLiabilitiesOn(['balance', true])
        setLiabilities([
            ...liabilities,
            {
                id: uuidv4(), 
                user_id: props.user.id,
                name: "New liability", 
                type: "Mortgage", 
                class: 'liability',
                balance: 0
            },
        ]);
    };

    const saveLiabilities = async () => {
        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full animate-spin'/>,
            text: 'Saving'
        })

        const { data: upsertLiabilitiesData, error: upsertLiabilitiesError } = await supabase
            .from('accounts')
            .upsert(liabilities)

        //filter liabilities down to necessary attributes 
        let liability_history = liabilities.map(({user_id, name, type, ...keepAttrs}) => keepAttrs)

        //add date attribute with today's date 
        liability_history = liability_history.map(obj => ({ ...obj, date: getDate() }))

        //upsert asset history 
        const { data: upsertLiabilityHistoryData, error: upsertLiabilityHistoryError } = await supabase
            .from('history')
            .upsert(liability_history)

        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none",
            icon: <CheckBadgeIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Done'
        })

        await timeout(2000);

        setSaveLiabilitesButton({
            className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
            icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
            text: 'Save'
        })
    }
    
    const editLiability = (e, id) => {
        const { name, value } = e.target
        const list = [...liabilities]
        let strippedValue = value

        if (name == "balance") {
            if (value && value != '$') {
                strippedValue = value.replace("$", "")
                strippedValue = strippedValue.replaceAll(',', '')
            } else {
                strippedValue = 0
            }
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
            .from('accounts')
            .delete()
            .eq('id', id)

    };
    //#endregion
    
    //#region secondary state variables
    const [saveAssetsButton, setSaveAssetsButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
        text: 'Save'
    })
    const [saveLiabilitiesButton, setSaveLiabilitesButton] = useState({
        className: "transition-all group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none", 
        icon: <ArrowPathIcon className='ml-1 h-4 rounded-full'/>,
        text: 'Save'
    })
    //#endregion

    //#region random functions 
    const getGoals = async () => {
        const {data: assetGoalsData, error: assetGoalsError} = await supabase
            .from('asset_goals')
            .select('id')
            .in('asset_id', assets.map(a => a.id))

        const {data: liabilityGoalsData, error: liabilityGoalsError} = await supabase
            .from('liability_goals')
            .select('id')
            .in('liability_id', liabilities.map(l => l.id))

        setNumGoals(assetGoalsData.length + liabilityGoalsData.length)
    }

    const getLastCheckIn = async () => {
        const {data: liabilityHistoryData, error: liabilityHistoryError} = await supabase
            .from('liability_history')
            .select('date')
            .in('id', liabilities.map(l => l.id))

        const {data: assetHistoryData, error: assetHistoryError} = await supabase
            .from('asset_history')
            .select('date')
            .in('id', assets.map(a => a.id))

        const allDatesSorted = liabilityHistoryData.sort().concat(assetHistoryData.sort())

        if (allDatesSorted) {
            setLastCheckIn(allDatesSorted.slice(-1)[0].date)
        } else {
            setLastCheckIn("Never!")
        }

    }


    //#endregion 
    
    useEffect(() => {
        if (props.user) {
            getAssets() 
            getLiabilities() 
        }
    }, [props.user])

    return (
        <>

            <div id='assets' className='col-span-4 lg:col-span-2'>
                <h1 className="inline-flex items-center text-2xl font-semibold text-sky-500">Assets</h1>
                <div className="mt-6 flex flex-col p-3 -mx-3 border border-dashed border-slate-300 rounded-lg">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-300'>
                                    <tr className='text-sm text-slate-500'>
                                        <th scope="col" className="py-2 pr-1.5 text-left">
                                            <span className='inline-flex'>
                                                Name
                                                <SortButton sortOn="name" onClickSort={sortAssets} />
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 text-left">
                                            <span className='inline-flex'>
                                                Category
                                                <SortButton sortOn="type" onClickSort={sortAssets} />
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right">
                                            <span className='inline-flex'>
                                                Balance
                                                <SortButton sortOn="balance" onClickSort={sortAssets} />
                                            </span>
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {assets && assets.length > 0 
                                    ? assets
                                        .sort(sortAssetsOn[1] ? (a, b) => a[sortAssetsOn[0]] < b[sortAssetsOn[0]] : (a, b) => a[sortAssetsOn[0]] > b[sortAssetsOn[0]])
                                        .map((asset) => (
                                            <tr key={asset.id}>
                                                <td className="whitespace-nowrap py-2 text-sm text-slate-500">
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
                                                <td className="whitespace-nowrap py-2 text-sm text-slate-500">
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
                                                <td className="whitespace-nowrap py-2 px-2 text-sm text-slate-500">
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
                                                    {asset ? <DeleteButton deleteAccount={deleteAsset} account={asset} /> : null}
                                                </td>
                                            </tr>
                                )) : assets 
                                    ? <EmptyTableBody message="No assets yet" icon={FaceFrownIcon} /> 
                                    : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            {assets && assets.length > 0 
                                ? 
                                    <div className='flex justify-end text-sm text-slate-800 pr-12 mr-1 py-3'>
                                        <h1 className="font-medium">Total <span className='font-serif font-bold pl-1'>&rarr;</span></h1>
                                        <h1 className="pl-2 font-semibold">{formatter.format(sumList(Object.values(filterData(assets))))}</h1>
                                    </div>
                                : null 
                            }

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveAssetsButton.className}
                                onClick={saveAssets}
                                >
                                    {saveAssetsButton.text}
                                    {saveAssetsButton.icon}
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none"
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

            <div id='assetBreakdown' className='mt-6 lg:mt-0 col-span-4 lg:col-span-2 flex flex-col justify-center align-middle'>
                {assets && assets.length > 0 && sumList(Object.values(filterData(assets))) > 0
                    ? 
                        <>
                            <AssetsDonut data={filterData(assets)} label="$"/>
                            <p className='text-sm text-center text-slate-300 pt-3'>Hover to see category totals</p>
                        </>
                    :   
                        <EmptyChartBody message="Add assets to see this chart" /> 
                }    
            </div>

            <div id='liabilities' className='mt-16 col-span-4 lg:col-span-2'>
                <h1 className="inline-flex items-center text-2xl font-semibold text-violet-500">Liabilities</h1>
                <div className="mt-6 flex flex-col p-3 -mx-3 border border-dashed border-slate-300 rounded-lg">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full pb-2 align-middle px-4 md:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className='border-b border-slate-300'>
                                    <tr className='text-sm text-slate-500'>
                                        <th scope="col" className="py-2 pr-1.5 text-left">
                                            <span className='inline-flex'>
                                                Name
                                                <SortButton sortOn="name" onClickSort={sortLiabilities} />
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 text-left">
                                            <span className='inline-flex'>
                                                Category
                                                <SortButton sortOn="type" onClickSort={sortLiabilities} />
                                            </span>
                                        </th>
                                        <th scope="col" className="py-2 pr-3 text-right">
                                            <span className='inline-flex'>
                                                Balance
                                                <SortButton sortOn="balance" onClickSort={sortLiabilities} />
                                            </span>
                                        </th>

                                        <th scope="col" className="py-2 pl-2">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-none">
                                {liabilities && liabilities.length > 0 
                                    ? liabilities
                                    .sort(sortLiabilitiesOn[1] ? (a, b) => a[sortLiabilitiesOn[0]] < b[sortLiabilitiesOn[0]] : (a, b) => a[sortLiabilitiesOn[0]] > b[sortLiabilitiesOn[0]])
                                    .map((liability) => (
                                        <tr key={liability.id}>
                                            <td className="whitespace-nowrap py-2 text-sm text-slate-500">
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
                                            <td className="whitespace-nowrap py-2 text-sm text-slate-500">
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
                                            <td className="whitespace-nowrap py-2 px-2 text-sm text-slate-500">
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
                                                {liability ? <DeleteButton deleteAccount={deleteLiability} account={liability} /> : null}
                                            </td>
                                        </tr>
                                )) : liabilities 
                                    ? <EmptyTableBody message="No liabilities yet" icon={FaceSmileIcon} /> 
                                    : <LoadingTableBody /> 
                                }
                                </tbody>
                            </table>

                            {liabilities && liabilities.length > 0 
                                ? 
                                    <div className='flex justify-end text-sm text-slate-800 pr-12 mr-1 py-3'>
                                        <h1 className="font-medium">Total <span className='font-serif font-bold pl-1'>&rarr;</span></h1>
                                        <h1 className="pl-2 font-semibold">{formatter.format(sumList(Object.values(filterData(liabilities))))}</h1>
                                    </div>
                                : null 
                            }

                            <div className="mt-4 text-right">
                                <button
                                type="button"
                                className={saveLiabilitiesButton.className}
                                onClick={saveLiabilities}
                                >
                                    {saveLiabilitiesButton.text}
                                    {saveLiabilitiesButton.icon}
                                </button>
                                <button
                                type="button"
                                className="ml-2 group inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none"
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

            <div id='liabilityBreakdown' className='mt-6 lg:mt-16 col-span-4 lg:col-span-2 flex flex-col justify-center align-middle'>
                {liabilities && liabilities.length > 0 && sumList(Object.values(filterData(liabilities))) > 0
                    ? 
                        <>
                            <AssetsDonut data={filterData(liabilities)} label="$"/>
                            <p className='text-sm text-center text-slate-300 pt-3'>Hover to see category totals</p>
                        </>
                    :   
                        <EmptyChartBody /> 
                }    
            </div>
        </>
    )
}