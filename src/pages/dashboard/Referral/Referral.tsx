import React, { useEffect, useState } from 'react'
import { Label } from '../../../components/Label/Label';
import TabBar from '../../../components/Tab/TabBar';
import ReferralPoints from './ReferralPoints';
import ReferralRules from './ReferralRules';

const Referral = () => {
    const [tab, setTab] = useState<string>("Referral Points")

   

    const displayAccountContent = (tabIndex: any) => {

        switch (tabIndex) {
            case "Referral Points":
                return <ReferralPoints />
            // return <BioProfile />
            case "Referral Rules":
                return <ReferralRules />
            default:
                return <ReferralPoints />
            // return <BioProfile />
        }
    }
    // useEffect(() => {

    // }, [tab])
    return (
        <div className='px-3  md:px-6'>
            <TabBar onChange={(val: any) => setTab(val)} tabs={["Referral Points", "Referral Rules"]} />
            <div className='mt-6'>
                {displayAccountContent(tab)}

            </div>

        </div>
    )
}

export default Referral