interface accountProps {
    accountName: string,
    tags?: Array<string>,
    currentValue?: number
}

export default function AccountCard({ accountName, tags=['none'], currentValue=0 }: accountProps) {
    return (
        <div className='rounded-sm w-sm bg-gray-300 text-gray-900 shadow-xl/30'>
            <h1>{ accountName }</h1>
            {
                tags.map((tag, index) => (
                    <p key={ index }>{ tag }</p>
                ))
            }
            <p>Current Value: { currentValue }</p>
        </div>
    )
}