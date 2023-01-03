import PostAuthNav from "./postauth/PostAuthNav"
import Accounts from './postauth/Accounts'
import PreAuthFooter from './preauth/PreAuthFooter'

export default function Example() {
    return (
        <>
        <div className="">
            <PostAuthNav current_tab='Data' />

            <div className="pt-10 pb-20 lg:pb-40 min-h-screen">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className='grid grid-cols-4 gap-5 lg:gap-10 grid-flow-row'>
                            <Accounts />
                        </div>
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </div>
        </>
    )
}
