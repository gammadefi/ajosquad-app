import React from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import { Label } from '../../components/Label/Label'
import { mockData } from '../../samples/mockdata'

const Payout = () => {
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
           <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and oversee all payout activities in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                    Monitor and manage all payout activities from a single, intuitive dashboard.
                    </p>
                </div>

            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='Total Withdrawal' />
                <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='AjoSquad Withdrawal' />
                <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='AjoHome Withdrawal' />
                <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='AjoBusiness Withdrawal' />
            </div>

           
            <div className='my-8 flex justify-between items-center '>
                <h3 className='text-xl font-semibold'>Payout Information</h3>

                <div className='flex items-center gap-2'>
                    <SearchInput placeholder='Search...' />
                    <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                </div>


            </div>

            {
                [].length === 0 ? <TableEmpty title='Payout History Details' image='/empty-states/payout.png' subtitle="On this page, you'll find a record of your previous payouts, including dates, and amount." /> : <Table
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

export default Payout