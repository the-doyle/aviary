import PostAuthNav from "./postauth/PostAuthNav"
import Accounts from './postauth/Accounts'
import PreAuthFooter from './preauth/PreAuthFooter'
import PageInfo from './general/PageInfo'

export default function Data() {
    return (
        <>
            <PostAuthNav current_tab='Data' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main>
                    <PageInfo 
                        title='Check in every month'
                        firstLine='Aviary provides a simple interface for tracking your assets and liabilities.' 
                        secondLine='Come back monthly to update your balances.'
                    />

                    <div className='grid grid-cols-4 gap-5 lg:gap-10 grid-flow-row'>
                        <Accounts />
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
