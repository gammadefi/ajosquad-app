import { useAuth } from '../../../zustand/auth.store'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import TabBar2 from '../../../components/Tab/TabBar2'
import Transaction from './CompletedSquadTabs/Transaction'
import AllMembers from './CompletedSquadTabs/AllMemebers'
import SquadInformation from './CompletedSquadTabs/SquadInformation'

const ActiveSquadDetails = () => {
    const profile = useAuth((s) => s.profile)
    const tabs = ["Squad Information", "Member Information", "Transaction"]
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("activeTab") || "Squad Information";


    const displayAccountContent = (currentTab: string) => {
        switch (currentTab) {
            case tabs[0]:
                return <SquadInformation />
            case tabs[1]:
                return <AllMembers />
            case tabs[2]:
                return <Transaction />
            default:
                return <SquadInformation />
            // return <BioProfile />
        }
    }
    const navigate = useNavigate()
    return (
        <div className='px-3  md:px-6' >
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex gap-2 my-6 items-center'>
                <div>
                    <h2 className='text-lg font-semibold'>Brass 2.0 Squad</h2>

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

        </div>
    )
}

export default ActiveSquadDetails