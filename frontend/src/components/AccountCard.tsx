interface accountCardProps {
    accountName: string,
    tags?: string[],
    currentValue?: number,
    className?: string
}

export default function AccountCard({ accountName, tags=['none'], currentValue=0, className=''}: accountCardProps) {
    return (
        <div className={ `rounded-sm bg-gray-300 text-gray-900 shadow-xl/30 ${className}` }>
            <h1 className='bg-emerald-700 text-white rounded-t-sm'>{ accountName }</h1>
            <p>Current Value: { currentValue }</p>
            {
                <p className='text-sm'>{ tags.join(', ') }</p>
            }
        </div>
    )
}