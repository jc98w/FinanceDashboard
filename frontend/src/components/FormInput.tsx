
interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    props?: React.Component<'input'>
}

export default function FormInput({label, props }: inputProps) {
    return (
        <div className='text-gray-900 mx-auto flex flex-row gap-4'>
            <label className='text-right w-35 truncate'>{ label }: </label>
            <input className='rounded-sm bg-gray-50 px-2'
                name={ label.toLowerCase() }
                autoComplete={ label }
                type={ label.toLowerCase() === 'password' ? 'password' : 'text' }
                { ...props }
            />
        </div>
    )
}