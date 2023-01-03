import PostAuthNav from "./postauth/PostAuthNav"
import Goals from './postauth/Goals'

export default function Progress() {
    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Progress' />

            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className='grid grid-cols-4 gap-5 lg:gap-10 grid-flow-row'>
                            <Goals />
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}
