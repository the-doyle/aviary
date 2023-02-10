import Image from "next/image";
import Link from "next/link";

export default function Logo(props) {
    return props.height && props.width ? (
        <Link 
            href='/'
        > 
            <Image
                className="block"
                height={`${props.height}`}
                width={`${props.width}`}
                src='/logo.png'
                alt="Aviary Finance Logo"
            />
        </Link>
    ) : null 
}