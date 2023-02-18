import Bird from "./Bird"

export default function Aviary(props) {
    const refreshUser = props.refreshUser ? props.refreshUser : null 
    
    return props.userData && props.birds && props.birds.length > 0 ? (
        <>
            <h1 id='aviary' className="inline-flex items-center text-2xl font-semibold text-skin-brand mb-2">Aviary</h1>
            <h1 className="items-center text-lg font-medium text-skin-muted mb-5">Balance:  {props.userData.feathers}🪶</h1>

            <div id='birds' className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2'>
                {props.birds
                    .map((bird) => (
                        props.userData.unlocked_birds.includes(bird.id)
                            ? <Bird unlocked key={bird.id} bird={bird} user={props.userData} refreshUser={refreshUser} /> 
                            : <Bird key={bird.id} bird={bird} user={props.userData} refreshUser={refreshUser} /> 
                    )) 
                }
                <div className='md:h-72' />
            </div>
                
        </>
    ) : <div className='min-h-screen' /> 
}