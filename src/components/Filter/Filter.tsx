import React, { FunctionComponent, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside';
import { Button } from '../Button/Button';
import { FaChevronDown } from 'react-icons/fa6';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface FilterITF {
    onClear?: () => void;
    onFilter?: () => void;
    open?: boolean;
    filterBy: ("date" | "amount" | "status" | "squad" | "position")[];
    onClose?: () => void;

}

const Filter: FunctionComponent<FilterITF> = ({
    onFilter = () => { },
    onClear = () => { },
    open,
    filterBy,
    onClose = () => { } }) => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [squad, setSquad] = useState(searchParams.get("squad") || "");
    const [position, setPosition] = useState(searchParams.get("position") || "");
    const [amount, setAmount] = useState({
        minAmount: searchParams.get("minAmount") || "",
        maxAmount: searchParams.get("maxAmount") || ""
    })
    const [date, setDate] = useState({
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || ""
    })
    const [showAmountFilter, setShowAmountFilter] = useState(false);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const FilterRef = useRef<any>();
    const [_, setSearchParams] = useSearchParams();

    useOnClickOutside(FilterRef, () => {
        onClose()
    })

    const handleOnFilter = () => {
        const filters = { squad, position, status, startDate: date.startDate, endDate: date.endDate, minAmount: amount.minAmount, maxAmount: amount.maxAmount }
        const filteredParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value.trim() !== "") {
                filteredParams.set(key, value);
            }
        });
        setSearchParams(filteredParams);
        onClose();
    }


    const handleOnClearFilters = () => {
        setSearchParams({}, { replace: true });
        resetFilters({ setStatus, setSquad, setPosition, setAmount, setDate });
        onClose();
    };

    return (
        <>
            {open && (
                <div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-50">
                    <div className="flex items-center justify-around min-w-44 h-screen">
                        <div
                            ref={FilterRef}
                            className="modal w-[90%] md:w-fit items-center align-middle py-2 px-2 bg-white rounded"
                        >
                            <div className="modal-head flex justify-between items-center px-1 py-1 ">
                                <button
                                    onClick={onClose}
                                    className="focus:outline-none text-black ml-auto focus:ring-0  focus:ring-opacity-75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="modal-body p-5 w-full md:min-w-96">
                                <div className='flex items-center gap-2 mb-4'>
                                    <div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="3.33333" transform="translate(0 1.66797)" fill="#464749" />
                                            <rect width="20" height="3.33333" transform="translate(0 8.33203)" fill="#464749" />
                                            <rect width="20" height="3.33333" transform="translate(0 15)" fill="#464749" />
                                            <rect x="3.07617" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                            <rect x="3.07617" y="13.332" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                            <rect x="14.6133" y="6.66797" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                        </svg>
                                    </div>
                                    <h4 className='text-xl font-medium'>Filter</h4>
                                </div>

                                <div className='w-full flex flex-col md:flex-row justify-between my-5 gap-3'>
                                    {
                                        filterBy.includes("status") && (
                                            <div className='w-full'>
                                                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} id="status" className='bg-[#F5F5F9] w-full md:w-fit disabled:text-[#666666] py-2.5 px-2 border-[0.4px] border-[#C8CCD0] rounded text-lg'>
                                                    <option disabled value="">Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Paid</option>
                                                    <option value="upcoming">Upcoming</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                    {
                                        filterBy.includes("squad") && (
                                            <div className='w-full'>
                                                <select name="squad" value={squad} onChange={(e) => setSquad(e.target.value)} id="squad" className='bg-[#F5F5F9] w-full md:w-fit disabled:text-[#666666] py-2.5 px-2 border-[0.4px] border-[#C8CCD0] rounded text-lg'>
                                                    <option disabled value="">Squad</option>
                                                    <option value="brass1.0">Brass 1.0</option>
                                                    <option value="bronze12.0">Bronze 12.0</option>
                                                    <option value="silver6.0">Silver 6.0</option>
                                                    <option value="gold12.0">Gold 12.0</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                    {
                                        filterBy.includes("position") && (
                                            <div className='w-full'>
                                                <select name="position" value={position} onChange={(e) => setPosition(e.target.value)} id="position" className='bg-[#F5F5F9] w-full md:w-fit disabled:text-[#666666] py-2.5 px-2 border-[0.4px] border-[#C8CCD0] rounded text-lg'>
                                                    <option disabled value="">Position</option>
                                                    <option value="position-1">Position 1</option>
                                                    <option value="position-2">Position 2</option>
                                                    <option value="position-3">Position 3</option>
                                                    <option value="position-4">Position 4</option>
                                                    <option value="position-5">Position 5</option>
                                                    <option value="position-6">Position 6</option>
                                                    <option value="position-7">Position 7</option>
                                                    <option value="position-8">Position 8</option>
                                                    <option value="position-9">Position 9</option>
                                                    <option value="position-10">Position 10</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                    {
                                        filterBy.includes("amount") && (
                                            <>
                                                <div onClick={() => setShowAmountFilter(!showAmountFilter)} id="status" className='bg-[#F5F5F9] w-full cursor-pointer px-2 py-2 md:py-0 flex items-center justify-between md:justify-center gap-3 border-[0.4px] border-[#C8CCD0] rounded text-lg'>
                                                    <span>Amount</span>
                                                    <FaChevronDown size={10} />
                                                </div>
                                                {
                                                    showAmountFilter && <div className='flex md:hidden gap-4'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="fromAmount">From</label>
                                                            <input value={amount.minAmount} onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (/^\d*\.?\d*$/.test(value)) {
                                                                    setAmount({ ...amount, minAmount: value })
                                                                }
                                                            }} placeholder='CAD$ 0.00' name="fromAmount" className='border border-[#D0D5DD] focus:outline-none w-full md:w-40 py-2 px-3 rounded-lg' />
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="toAmount">To</label>
                                                            <input value={amount.maxAmount} onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (/^\d*\.?\d*$/.test(value)) {
                                                                    setAmount({ ...amount, maxAmount: value })
                                                                }
                                                            }} placeholder='CAD$ 0.00' name="toAmount" className='border border-[#D0D5DD] focus:outline-none w-full md:w-40 py-2 px-3 rounded-lg' />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        filterBy.includes("date") && (
                                            <>
                                                <div onClick={() => setShowDateFilter(!showDateFilter)} id="status" className='bg-[#F5F5F9] w-full cursor-pointer px-2 py-2 md:py-0 flex items-center justify-between md:justify-center gap-3 border-[0.4px] border-[#C8CCD0] rounded text-lg'>
                                                    <span>Date</span>
                                                    <FaChevronDown size={10} />
                                                </div>
                                                {
                                                    showDateFilter && <div className='flex md:hidden gap-4'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="fromDate">From</label>
                                                            <input type="date" value={date.startDate} onChange={(e) => setDate({ ...date, startDate: e.target.value })} placeholder='CAD$ 0.00' name="fromAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="toDate">To</label>
                                                            <input type="date" value={date.endDate} onChange={(e) => setDate({ ...date, endDate: e.target.value })} placeholder='CAD$ 0.00' name="toAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className='flex justify-between items-end'>
                                    <div className='space-y-2'>
                                        {
                                            filterBy.includes("amount") && (
                                                <>
                                                    {
                                                        showAmountFilter && <div className='hidden md:flex  gap-4'>
                                                            <div className='flex flex-col'>
                                                                <label htmlFor="fromAmount">From</label>
                                                                <input value={amount.minAmount} onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                                        setAmount({ ...amount, minAmount: value })
                                                                    }
                                                                }} placeholder='CAD$ 0.00' name="fromAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <label htmlFor="toAmount">To</label>
                                                                <input value={amount.maxAmount} onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                                        setAmount({ ...amount, maxAmount: value })
                                                                    }
                                                                }} placeholder='CAD$ 0.00' name="toAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            )
                                        }
                                        {
                                            filterBy.includes("date") && (
                                                <>
                                                    {
                                                        showDateFilter && <div className='hidden md:flex  gap-4'>
                                                            <div className='flex flex-col'>
                                                                <label htmlFor="fromDate">From</label>
                                                                <input type="date" value={date.startDate} onChange={(e) => setDate({ ...date, startDate: e.target.value })} placeholder='CAD$ 0.00' name="fromAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <label htmlFor="toDate">To</label>
                                                                <input type="date" value={date.endDate} onChange={(e) => setDate({ ...date, endDate: e.target.value })} placeholder='CAD$ 0.00' name="toAmount" className='border border-[#D0D5DD] focus:outline-none w-40 py-2 px-3 rounded-lg' />
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='ml-auto flex items-center gap-2'>
                                        <Button className='bg-red-500' onClick={handleOnClearFilters} label="Clear Filters" />
                                        <Button onClick={handleOnFilter} label="Filter Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Filter


interface FilterState {
    setStatus: (val: string) => void;
    setSquad: (val: string) => void;
    setPosition: (val: string) => void;
    setAmount: (val: { minAmount: string; maxAmount: string }) => void;
    setDate: (val: { startDate: string; endDate: string }) => void;
}

const resetFilters = ({
    setStatus,
    setSquad,
    setPosition,
    setAmount,
    setDate,
}: FilterState) => {
    setStatus("");
    setSquad("");
    setPosition("");
    setAmount({ minAmount: "", maxAmount: "" });
    setDate({ startDate: "", endDate: "" });
};
