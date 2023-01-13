import Link from 'next/link'

export default function LinkButton(props) {
    return props.href && props.text && !props.link ? (
        <a
          href={props.href}
          className="group inline-flex items-center rounded-md border border-slate-400 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none"
        >
            {props.text}
            <span className='font-serif font-bold ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </a>
    ) : props.href && props.text && props.link ? (
        <Link
          href={props.href}
          className="group inline-flex items-center rounded-md border border-slate-400 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none"
        >
            {props.text}
            <span className='font-serif font-bold ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </Link>
    ) : null
}
  