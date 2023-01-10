import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";

export default function Example() {
    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">Aviary!</h1>
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
        </div>
        </>
    )
}
