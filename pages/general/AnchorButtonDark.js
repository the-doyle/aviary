import Link from "next/link"

export default function AnchorButtonDark(props) {
    return props.href && props.text ? (
        <Link
          href={props.href}
          className="group inline-flex items-center rounded-md border border-green-400 bg-green-200 px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-green-300 hover:text-slate-800 focus:outline-none"
        >
            {props.text}
            <span className='font-serif font-bold ml-2 group-hover:ml-3 group-hover:-mr-1'>
            &rarr;
            </span>
        </Link>
    ) : null
}
  