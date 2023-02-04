import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import AchievementButton from './AchievementButton';

export default function Achievements(props) {
    const supabase = useSupabaseClient() 

    const [open, setOpen] = useState(false)
    const [achievements, setAchievements] = useState(null)
    const [claimableAchievements, setClaimableAchievements] = useState(10)
    const refreshUser = props.refreshUser ? props.refreshUser : null 

    //#region functions
    const getAchievements = async () => {
        const {data: achievementsData, error: achievementsError} = await supabase 
            .from('achievements')
            .select('*')

        setAchievements(achievementsData)

        let claimable_achievements = 0

        achievementsData.map((a) => {
            if (!props.user.achievements.includes(a.id) && props.user[a.tracks] >= a.requirement) {
                claimable_achievements += 1
            }
        })
        
        setClaimableAchievements(claimable_achievements)
    }

    const claimAchievement = async (id, num_feathers) => {
        let user_feathers = props.user.feathers
        user_feathers += num_feathers

        let user_achievements = props.user.achievements
        user_achievements.push(id)

        const {data: claimAchievementData, error: claimAchievementError} = await supabase 
            .from('users')
            .update({ achievements: user_achievements, feathers: user_feathers })
            .eq('id', props.user.id)
            
        refreshUser() 
    }

    const handleClick = async () => {
        setOpen(true)
        refreshUser() 
    }
    //#endregion

    useEffect(() => {
        if (props.user) {
            getAchievements() 
        }
    }, [props.user])

    return props.user && achievements && refreshUser ? (
        <>
            <button 
            type="button" 
            className={`group relative flex justify-center rounded-md border border-skin-secondary-button-border text-skin-base bg-skin-secondary p-3 text-sm font-medium hover:bg-skin-secondary-hover focus:outline-none`}
            onClick={handleClick}
            >
                🪶

                {claimableAchievements > 0 
                    ? 
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-skin-inverted bg-skin-brand border-2 border-skin-inverted rounded-full -top-2 -right-2">
                            {claimableAchievements}
                        </div>
                    :   null 
                }
                
            </button>

        
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="py-6 px-4 sm:px-6 bg-skin-secondary-hover">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-2xl font-medium text-skin-base">Achievements</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md text-skin-light hover:text-skin-base focus:outline-none"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <h1 className='text-sm text-skin-base mt-1'>
                                                {props.user.feathers} 🪶
                                            </h1>
                                        </div>

                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {achievements
                                                .map((a) => (
                                                    <div key={a.id} className='flex-col border-b py-4 items-center'>
                                                        <div className='flex justify-between'>
                                                            <div className='flex-col justify-between align-middle'>
                                                                <h1 className='text-lg text-skin-brand font-semibold'>{a.name}</h1>
                                                                <p className='text-base text-skin-light'>{a.description}</p>
                                                            </div>
                                                            <div className='flex-col text-center'>
                                                                <AchievementButton achievement={a} claimAchievement={claimAchievement} user={props.user} /> 
                                                                {props.user.achievements.includes(a.id)
                                                                    ? null 
                                                                    : 
                                                                    <p className='text-xs text-skin-muted'>
                                                                        Progress: {props.user[a.tracks]} / {a.requirement}
                                                                    </p>
                                                                }
                                                            </div>
                                                        </div>
                                                        {/* <p className='flex text-sm italic text-slate-400'> {a.fun_fact} </p> */}
                                                    </div> 
                                                ))
                                            }
                                            <p className='mt-5 text-sm text-skin-muted text-center'>More achievements will be added soon!</p>
                                        </div>
                                    </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    ) : 
        <button 
            className='inline-flex items-center rounded-md border border-skin-secondary-button-border text-skin-light bg-skin-secondary p-3 text-sm font-medium hover:bg-skin-secondary-hover focus:outline-none' 
        >
            🪶
        </button>
}
