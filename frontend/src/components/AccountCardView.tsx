import { useAccountCtx } from '../contexts/AccountContext';
import AccountCard from './AccountCard'
import useEmblaCarousel from 'embla-carousel-react'

export default function AccountCardView() {
    const [emblaRef] = useEmblaCarousel();
    const { accounts } = useAccountCtx();

    return (
        <div className='overflow-hidden' ref={ emblaRef }>
            <div className='flex flex-row gap-4'>
                {
                    accounts.map((value, index) => (
                        <AccountCard className='w-60 h-60 shrink-0 snap-start' key={ index } accountName={ value.accountName } currentValue={ value.currentValue } tags={ value.tags }/>
                    ))
                }
            </div>
        </div>
    )
}