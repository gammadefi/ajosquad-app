import { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside';
import { useSearchParams } from 'react-router-dom';


const Filter = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const FilterRef = useRef<any>();
    const [_, setSearchParams] = useSearchParams();

    useOnClickOutside(FilterRef, () => {
        setOpenFilter(false)
    })

    const handleOnFilter = (value: string) => {
        setSearchParams({ filterBy: value });
    }

    return (
        <div ref={FilterRef} className='relative w-full md:w-1/5 lg:w-fit '>
            <button onClick={() => setOpenFilter(!openFilter)} className='bg-[#F5F5F9] w-full flex items-center text-nowrap justify-center gap-2 border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="3.33333" transform="translate(0 1.66797)" fill="#464749" />
                    <rect width="20" height="3.33333" transform="translate(0 8.33203)" fill="#464749" />
                    <rect width="20" height="3.33333" transform="translate(0 15)" fill="#464749" />
                    <rect x="3.07617" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                    <rect x="3.07617" y="13.332" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                    <rect x="14.6133" y="6.66797" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                </svg>
                <span>
                    Filter By
                </span>
            </button>
            {openFilter && (
                <div
                    className="absolute z-50 right-0 -bottom-20 bg-white text-nowrap flex flex-col items-start gap-3 py-2 px-3 rounded"
                >
                    <button onClick={() => handleOnFilter("registered")}>Registered</button>
                    <button onClick={() => handleOnFilter("joined-a-squad")}>Joined a squad</button>
                </div>
            )}
        </div>
    )
}

export default Filter