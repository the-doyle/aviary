import PostAuthNav from "./postauth/PostAuthNav"
import PreAuthFooter from "./preauth/PreAuthFooter"
import Goals from './postauth/Goals'

export default function Progress() {
    return (
        <>
            <PostAuthNav current_tab='Progress' />

            <div className="pt-10 lg:pt-20 pb-20 lg:pb-60 min-h-screen">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">Progress!</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-8 sm:px-0">
                            <div className="h-96 rounded-lg border-4 border-dashed border-slate-200" />
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </>
    )
}
