import React, { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import { Label } from '../../components/Label/Label'
import { mockData } from '../../samples/mockdata'
import Filter from '../../components/Filter/Filter'

const Payment = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Description",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Position",
            view: (row: any) => <div>{row.position}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>{row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{row.date}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];



    return (
        <div className='px-3  md:px-6'>
            <div>
                <InfoCard iconName='moneys-credit' value='CA$ 50,500.00' header='Total deposit' />
            </div>

            <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Payment</span>  Stay on top of your finances! Track every payment made on your account.</h3>

            <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                <div className='flex justify-between'>
                    <h3 className='text-xl font-semibold'>All Payment  Transaction</h3>
                    <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                </div>
                <div className='flex items-center gap-2'>
                    <SearchInput placeholder='Search...' />
                    <button onClick={() => setOpenFilter(true)} className='bg-[#F5F5F9] w-full md:w-1/5 lg:w-full flex items-center justify-center gap-2 border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>
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
                    <button className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                </div>
                <Filter filterBy={["amount", "date", "position", "squad", "status"]} open={openFilter} onClose={() => setOpenFilter(false)} />
            </div>

            {
                [].length === 0 ? <TableEmpty title='Payment History Details' image='/empty-states/payment.png' subtitle="On this page, you'll find a record of your previous payment, and upcoming payment." /> : <Table
                    data={mockData.data}
                    columns={columns}
                    loading={false}
                    pagination={
                        mockData.pagination
                    }

                />
            }


        </div>
    )
}

export default Payment