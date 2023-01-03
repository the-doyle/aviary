export default function EmptyTableBody(props) {
    return (
        <tr>
            <td colSpan="4">
                <div className="relative mt-4 mb-2">
                    {/* <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div> */}
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500 flex">
                            {props.message}
                            <props.icon className='h-5 ml-2' /> 
                        </span>
                    </div>
                </div>
            </td>
        </tr>
    )
}