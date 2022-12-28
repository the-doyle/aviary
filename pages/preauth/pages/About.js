import BirdCard from "../../general/BirdCard";

const birds = [
    {rarity: 'Common', name: 'House sparrow', date: 'Jan 2023', description: 'House sparrows have a wingbeat rate of roughly 15 times per second'}, 
    {rarity: 'Rare', name: 'North American Blackbird', date: 'Dec 2022', description: 'These blackbirds always lay two eggs, nurturing both birds'}, 
    {rarity: 'Exotic', name: 'Bald eagle', date: 'Aug 2022', description: 'Bald eagles wait around for the salmon run in Alaska before flying south'}, 
    {rarity: 'Legendary', name: 'King penguin', date: 'Mar 2023', description: 'King penguins can reach a height of over 35 inches'},
]

export default function About() {
    return (
        <div className='grid grid-cols-12 gap-0'>
            {birds.map((bird) => (
                <div className=''>
                    <BirdCard rarity={bird.rarity} name={bird.name} date={bird.date} description={bird.description} /> 
                </div>
            ))}
        </div>
    )
}