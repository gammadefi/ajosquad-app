import React from 'react'
import { mockData } from '../../../samples/mockdata';
import { Table, TableEmpty } from '../../../components/Table/Table';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { InfoCard } from '../../../components/InfoCard/InfoCard2';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const SquadMember = () => {
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
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Squad Member</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                    You can view all the squad member information and record here.
                    </p>
                </div>
              



            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-3'>
                <InfoCard header="Squad Member" iconName='people' value="50" />
                <InfoCard header="Completed Square" iconName='profile-2user-active' value="50" />
                <InfoCard header="Points" iconName='profile-2user-inactive' value="50" />
                
                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Members</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>


                </div>

                
            {
                [].length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
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

export default SquadMember