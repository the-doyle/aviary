import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import Goals from './postauth/Goals'
import PageInfo from './general/PageInfo'

export default function GoalsPage() {
    return (
        <>
            <PostAuthNav current_tab='Goals' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <main>
                    <PageInfo 
                        title='Set and track goals'
                        firstLine='Here, you can set goals to grow your assets and pay down liablities (debts).' 
                        secondLine='You&apos;ll earn feathers for achieving goals, which can be used to unlock new birds in your Aviary!'
                    />

                    <div className='grid grid-cols-5 gap-5 lg:gap-10 grid-flow-row'>
                        <Goals />
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
