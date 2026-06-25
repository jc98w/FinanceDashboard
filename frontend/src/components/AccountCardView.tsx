import type { Account } from '../types/account'
import AccountCard from './AccountCard'
import useEmblaCarousel from 'embla-carousel-react'

interface ViewProps {
    accounts: Account[]
}

export default function AccountCardView({ accounts }: ViewProps) {
    const [emblaRef] = useEmblaCarousel();

    return (
        <div className='overflow-hidden' ref={ emblaRef }>
            <div className='flex flex-row gap-4'>
                {
                    accounts.map((value, index) => (
                        <AccountCard className='w-60 h-60 shrink-0 snap-start' key={ index } accountName={ value.accountName } tags={ value.tags }/>
                    ))
                }
            </div>
        </div>
    )
}