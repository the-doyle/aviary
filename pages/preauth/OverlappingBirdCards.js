import BirdCard from "../general/BirdCard"

const birds = [
    {mt: 'mt-0', rarity: 'Common', name: 'House sparrow', date: 'Jan 2023', description: 'House sparrows have a wingbeat rate of roughly 15 times per second'}, 
    {mt: 'mt-12', rarity: 'Rare', name: 'North American Blackbird', date: 'Dec 2022', description: 'These blackbirds always lay two eggs, nurturing both birds'}, 
    {mt: 'mt-24', rarity: 'Exotic', name: 'Bald eagle', date: 'Aug 2022', description: 'Bald eagles wait around for the salmon run in Alaska before flying south'}, 
]

export default function OverlappingBirdCards() {
    return (
        <div className='grid grid-cols-6 gap-0'>
            {birds.map((bird) => (
                <div key={bird.name} className={bird.mt}>
                    <BirdCard rarity={bird.rarity} name={bird.name} date={bird.date} description={bird.description} /> 
                </div>
            ))}
        </div>
    )
}