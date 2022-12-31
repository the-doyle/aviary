import Link from 'next/link'

export default function LinkButton(props) {
    return props.href && props.text && !props.link ? (
        <a
          href={props.href}
          className="group inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        >
            {props.text}
            <span className='ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </a>
    ) : props.href && props.text && props.link ? (
        <Link
          href={props.href}
          className="group inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        >
            {props.text}
            <span className=' ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </Link>
    ) : null
}
  