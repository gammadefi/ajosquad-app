import React, { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import TextInput from '../../../components/FormInputs/TextInput2'
import { Button } from '../../../components/Button/Button'
import { IoCopyOutline } from "react-icons/io5";
import SearchInput from '../../../components/FormInputs/SearchInput';
import { mockData } from '../../../samples/mockdata';
import { Table } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import Filter from '../../../components/Filter/Filter2';

const ReferralPoints = () => {
    const [filterBy, setFilterBy] = useState("");
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
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>

                <button>Redeem Point <span></span></button>



            </div>
            <div className='lg:gri flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard header="Total Referrals" iconName='profile-2user' value="50" />
                <InfoCard header="Approved Referrals" iconName='profile-tick' value="50" />
                <InfoCard header="Points" iconName='ticket-discount' value="50" />
                <InfoCard header="Redeemed Points" iconName='ticket-discount-1' value="50" />
                <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" />

            </div>

            <div>
                <h3 className='text-base md:text-xl font-semibold mb-4'>Referral a Friend</h3>
                <div >
                    <h4 className='mb-1 font-semibold'>Invite Link</h4>
                    <div className='flex items-center gap-2'>
                        <input readOnly disabled name='inviteLink' className='border rounded-md h-[44px] px-3 w-[343px] text-sm' value={"ajosquad.com/favidesign62g"} />
                        <Button label='Copy Link' className='whitespace-nowrap' iconPosition='beforeText' icon={<IoCopyOutline color='white' />} />
                    </div>
                    <small>Minimum point to redeem is CAD$50</small>
                </div>

                <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>Referral</h3>
                        <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Redeem Points</button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <Filter />
                        <button className='hidden lg:block text-primary px-4 py-2 border text-nowrap border-primary rounded-lg font-semibold'>Redeem Points</button>
                    </div>


                </div>

                <Table
                    data={mockData.data}
                    columns={columns}
                    loading={false}
                    pagination={
                        mockData.pagination
                    }

                />


            </div>
        </div>
    )
}

export default ReferralPoints