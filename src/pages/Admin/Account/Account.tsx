import React from 'react'
import Profile from './Profile';
import PasswordSetting from './PasswordSetting';
import TabBar2 from '../../../components/Tab/TabBar2';
import { useLocation } from 'react-router-dom';
import ContractAgreement from './ContractAgreement';

const Account = () => {
    const tabs = ["profile", "password settings", "contract agreement"]
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("activeTab") || "profile";


    const displayAccountContent = (currentTab: string) => {
        switch (currentTab) {
            case tabs[0]:
                return <Profile />
            case tabs[1]:
                return <PasswordSetting />
            case tabs[2]:
                return <ContractAgreement />
            default:
                return <Profile />
            // return <BioProfile />
        }
    }
    return (
        <div className='px-3  md:px-6'>
            <TabBar2
                tabs={tabs}
                activeTab={activeTab}
                isDashboard={false}
                showLogout={true}
            />
            <div className='mt-6'>
                {displayAccountContent(activeTab)}

            </div>

        </div>
    )
}

export default Account