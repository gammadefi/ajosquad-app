import { useAuth } from '../../../zustand/auth.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import TabBar2 from '../../../components/Tab/TabBar2'
import AllMembers from './CompletedSquadTabs/AllMemebers'
import SquadInformation from './CompletedSquadTabs/SquadInformation'
import { useQuery } from 'react-query'
import { squadServices } from '../../../services/squad'
import PageLoader from '../../../components/spinner/PageLoader'

const ActiveSquadDetails = () => {
    // const profile = useAuth((s) => s.profile)
    const tabs = ["Squad Information", "Member Information"]
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get("activeTab") || "Squad Information";
    const { id }: any = useParams()

    const { data: info, isLoading } = useQuery(['squad-info', id], () => squadServices.getSquad(id))


    const displayAccountContent = (currentTab: string) => {
        switch (currentTab) {
            case tabs[0]:
                return <SquadInformation />
            case tabs[1]:
                return <AllMembers />
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
                    <h2 className='text-lg font-semibold'>{info && info.data && info.data.name} Squad</h2>

                </div>
            </div>


            <TabBar2
                isDashboard={false}
                tabs={tabs}
                activeTab={activeTab}
            />
            <div className='mt-6'>
                {isLoading ? <PageLoader /> :
                    <>
                        {displayAccountContent(activeTab)}
                    </>

                }

            </div>

        </div>
    )
}

export default ActiveSquadDetails