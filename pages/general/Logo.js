import Image from "next/image";

export default function Logo(props) {
    return props.height && props.width ? (
        <Image
            className="block"
            height={`${props.height}`}
            width={`${props.width}`}
            src='/logo.png'
            alt="Aviary Finance Logo"
        />
    ) : null 
}