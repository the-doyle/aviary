import PostAuthNav from "./postauth/PostAuthNav";

export default function Profile() {
    return (
        <div className="overflow-hidden bg-white">
            <PostAuthNav current_tab='Profile' />

            {/* <BackgroundBirds /> */}

            <div className="relative z-10 py-10 min-h-screen">
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-5 grid-flow-rows gap-5">

                        <div className='col-span-5 lg:col-span-3 bg-slate-100 rounded-lg shadow p-5'>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-slate-900">Profile</h3>
                                {/* <p className="mt-1 max-w-2xl text-sm text-slate-500">Personal details</p> */}
                            </div>
                            <div className="mt-5 border-t border-slate-200">
                                <dl className="divide-y divide-slate-200">
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">First name</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Ben</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Application for</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Backend Developer</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Email address</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">margotfoster@example.com</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Salary expectation</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">$120,000</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                
                                </dl>
                            </div>
                        </div>

                        <div className='col-span-5 lg:col-span-2 bg-slate-100 rounded-lg shadow p-5'>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-slate-900">Account</h3>
                                {/* <p className="mt-1 max-w-2xl text-sm text-slate-500">Person</p> */}
                            </div>
                            <div className="mt-5 border-t border-slate-200">
                                <dl className="divide-y divide-slate-200">
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">First name</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Ben</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Application for</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">Backend Developer</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Email address</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">margotfoster@example.com</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                        <dt className="text-sm font-medium text-slate-500">Salary expectation</dt>
                                        <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <span className="flex-grow">$120,000</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="rounded-md font-medium text-green-600 hover:text-green-500 focus:outline-none"
                                                >
                                                Update
                                            </button>
                                        </span>
                                        </dd>
                                    </div>
                                
                                </dl>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
