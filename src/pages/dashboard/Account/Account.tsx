import React, { useState } from 'react'
import TabBar from '../../../components/Tab/TabBar';
import Profile from './Profile';
import PasswordSetting from './PasswordSetting';

const Account = () => {
    const tabs = ["profile", "Bank", "Password Settings", "Guarantor Information", "Contract Agreement"]

    const [tab, setTab] = useState<string>(tabs[0])

    const displayAccountContent = (tabIndex: any) => {

        switch (tabIndex) {
            case tabs[0]:
                return <Profile />
            case tabs[1]:
                return ""
            case tabs[2]:
                return <PasswordSetting />
            case tabs[3]:
                return ""
            case tabs[4]:
                return ""
            default:
                return ""
            // return <BioProfile />
        }
    }
    return (
        <div className='px-3  md:px-6'>
            <TabBar onChange={(val: any) => setTab(val)} tabs={tabs} />
            <div className='mt-6'>
                {displayAccountContent(tab)}

            </div>

        </div>
    )
}

export default Account