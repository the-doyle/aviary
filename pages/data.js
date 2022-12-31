import PostAuthNav from "./postauth/PostAuthNav"
import Accounts from './postauth/Accounts'

export default function Example() {
    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Data' />

            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className='grid grid-cols-4 gap-10 grid-flow-row'>
                            <Accounts />
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}
