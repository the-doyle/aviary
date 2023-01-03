export default function EmptyTableBody(props) {
    return props.message ? (
        <tr>
            <td colSpan="4">
                <div className="relative mt-4 mb-2">
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500 flex">
                            {props.message}
                            <props.icon className='h-5 ml-2' /> 
                        </span>
                    </div>
                </div>
            </td>
        </tr>
    ) : null
}