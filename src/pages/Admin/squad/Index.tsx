import React from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import TextInput from '../../../components/FormInputs/TextInput2'
import { Button } from '../../../components/Button/Button'
import { IoCopyOutline } from "react-icons/io5";
import SearchInput from '../../../components/FormInputs/SearchInput';
import { mockData } from '../../../samples/mockdata';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate()
    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Payment Description",
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
            <div className='flex flex-wrap justify-between items-center'>
                <div>
                    <h3 className='text-base  md:text-xl font-semibold'>Manage and oversee all squad activities in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Monitor and control all squad activities from a centralized dashboard. Efficiently track progress, create squad, and drive squad productivity
                    </p>
                </div>
                <button className='h-[44px] border mt-5 lg:mt-0 border-primary px-4 py-2 rounded' >Create Squad <span></span></button>



            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard header="Squad Member" iconName='people' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/squad-member")
                    }
                }} value="50" />
                <InfoCard header="Completed Squad" iconName='tick-square' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/completed-squad")

                    }
                }} value="50" />
                <InfoCard header="Active Squad" iconName='activity' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/active-squad")
                    }
                }} value="50" />
                <InfoCard header="Upcoming Squad" iconName='timer' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/upcoming-squad")
                    }
                }} value="50" />
                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Transactions</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>


                </div>

                
            {
                [].length === 0 ? <TableEmpty title='No transactions yet' image='/empty-states/transaction.png' subtitle="You're just getting started! No transaction has occurred yet on the platform." /> : <Table
                    data={mockData.data}
                    columns={columns}
                    loading={false}
                    pagination={
                        mockData.pagination
                    }

                />
            }


            </div>
        </div>
    )
}

export default Index