import React from 'react'
import { FaCamera, FaSolarPanel } from 'react-icons/fa6'
import { useAuth } from '../../../zustand/auth.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import TabBar2 from '../../../components/Tab/TabBar2'
import Profile from './SquadMemberTabs/Profile'
import SquadInformation from './SquadMemberTabs/SquadInformation'
import Transaction from './SquadMemberTabs/Transaction'
import { useQuery } from 'react-query'
import { userServices } from '../../../services/user'
import PageLoader from '../../../components/spinner/PageLoader'
import GuarantorInformation from './SquadMemberTabs/GuarantorInformation'

const SquadMemberDetails = () => {
    const profile = useAuth((s) => s.profile)
    const tabs = ["Member Information", "Squad Information", "Transaction", "guarantor"]
    const { id }: any = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("activeTab") || "Member Information";

    const { data: userData, isLoading } = useQuery(["fetch-user-details", id], () => userServices.user.getUserById(id))




    const displayAccountContent = (currentTab: string) => {
        switch (currentTab) {
            case tabs[0]:
                return <Profile />
            case tabs[1]:
                return <SquadInformation />
            case tabs[2]:
                return <Transaction />
            case tabs[3]:
                return <GuarantorInformation />
            default:
                return <Profile />
            // return <BioProfile />
        }
    }
    const navigate = useNavigate()
    console.log(userData)
    return (
        <>
            {isLoading ? <PageLoader />
                :
                <div className='px-3  md:px-6' >
                    <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
                    <div className='flex gap-2 my-6 items-center'>
                        <div className='relative w-fit'>
                            <img src="/Image.svg" className='h-[64px] w-[64px] ' alt="" />
                            <span className='absolute h-3 w-3 bg-[#0F973D] rounded-full bottom-2 right-1' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold'>{userData && userData.data?.firstName + " " + userData.data.lastName}</h2>
                            <p><span className='text-[#787A7D]'>ID: </span>{userData && userData.data.id}</p>
                            <p className='text-[#787A7D]'>{userData && userData.data.email_address}</p>
                        </div>
                    </div>

                    <TabBar2
                        isDashboard={false}
                        tabs={tabs}
                        activeTab={activeTab}
                    />
                    <div className='mt-6'>
                        {displayAccountContent(activeTab)}

                    </div>

                </div>}
        </>



    )
}

export default SquadMemberDetails