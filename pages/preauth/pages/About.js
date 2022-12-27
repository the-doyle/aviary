import BirdCard from "../../general/BirdCard";

export default function About() {
    return (
        <div className='flex flex-auto'>
            <BirdCard rarity='Common' />
            <BirdCard rarity='Rare' />
            <BirdCard rarity='Exotic' />
            <BirdCard rarity='Legendary' />
        </div>
    )
}