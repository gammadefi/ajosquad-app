import React from 'react'
import Profile from './Profile';
import PasswordSetting from './PasswordSetting';
import Bank from './Bank';
import TabBar2 from '../../../components/Tab/TabBar2';
import { useLocation } from 'react-router-dom';
import GuarantorInformation from './GuarantorInformation';
import ContractAgreement from './ContractAgreement';

const Account = () => {
    const tabs = ["profile", "bank", "password settings", "guarantor information", "contract agreement"]
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("activeTab") || "profile";


    const displayAccountContent = (currentTab: string) => {
        switch (currentTab) {
            case tabs[0]:
                return <Profile />
            case tabs[1]:
                return <Bank />
            case tabs[2]:
                return <PasswordSetting />
            case tabs[3]:
                return <GuarantorInformation />
            case tabs[4]:
                return <ContractAgreement />
            default:
                return ""
            // return <BioProfile />
        }
    }
    return (
        <div className='px-3  md:px-6'>
            <TabBar2
                isDashboard={false}
                tabs={tabs}
                activeTab={activeTab}
            />
            <div className='mt-6'>
                {displayAccountContent(activeTab)}

            </div>

        </div>
    )
}

export default Account