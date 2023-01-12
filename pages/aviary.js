import PostAuthNav from "./postauth/PostAuthNav";
import PreAuthFooter from "./preauth/PreAuthFooter";
import Bird from "./aviary/Bird";

export default function Example() {
    return (
        <>
        <div className="min-h-full">
            <PostAuthNav current_tab='Aviary' />

            <div className="pt-20 pb-20 lg:pb-60 min-h-screen">
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className='flex overflow-scroll rounded-lg bg-white py-2 h-60'>
                            <Bird unlocked /> 
                            <Bird unlocked />
                            <Bird />
                            <Bird />
                            <Bird />
                            <Bird />
                            <Bird />
                        </div>
                    </div>
                </main>
            </div>

            <PreAuthFooter /> 
        </div>
        </>
    )
}
