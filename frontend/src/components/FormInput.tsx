
interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

export default function FormInput({ label, ...rest }: inputProps) {
    return (
        <div className='text-gray-900 mx-auto flex flex-row gap-4'>
            <label className='text-right w-35 truncate'>{ label }: </label>
            <input className='rounded-sm bg-gray-50 px-2'
                name={ label.toLowerCase() }
                autoComplete={ label }
                { ...rest }
            />
        </div>
    )
}