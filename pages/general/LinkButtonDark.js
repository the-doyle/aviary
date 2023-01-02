import Link from 'next/link'

export default function LinkButtonDark(props) {
    return props.href && props.text && !props.link ? (
        <a
          href={props.href}
          className="group inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
        >
            {props.text}
            <span className=' ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </a>
    ) : props.href && props.text && props.link ? (
        <Link
          href={props.href}
          className="group inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
        >
            {props.text}
            <span className=' ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </Link>
    ) : null
}
  