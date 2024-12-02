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
            <div>
                <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='Total Withdrwal' />
            </div>

            <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Payout</span>  Track your payouts easily. See every transaction in one place.</h3>

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