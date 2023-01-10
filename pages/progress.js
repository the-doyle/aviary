import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import Goals from './postauth/Goals'

export default function Progress() {
    return (
        <>
            <PostAuthNav current_tab='Progress' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className='grid grid-cols-5 gap-5 lg:gap-10 grid-flow-row'>
                            <Goals />
                        </div>
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
