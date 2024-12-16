import React, { useState } from 'react'
import TabBar from '../../components/Tab/TabBar'
import SearchInput from '../../components/FormInputs/SearchInput'
import { GoStar, GoStarFill, GoTrash } from "react-icons/go";
import { Paginator } from '../../components/Table/Paginator';
import { Pagination } from '../../components/Table/Table';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { NotificationService } from '../../services/notification';
import PageLoader from '../../components/spinner/PageLoader';

const Notifications = () => {
    const tabs = ["All", "Archived"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const { data: Notifications, isLoading, refetch } = useFetchWithParams(
        ["query-all-notifications", {
            archived: activeTab && activeTab === "Archived"
        }],
        NotificationService.getNotifications,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    return (
        <div className='px-3  md:px-6'>
            <div className='flex rounded-t-md bg-[#E6F0FF] px-3 h-[44px] gap-3 items-center'>
                <img src='' alt='' />
                <h3 className='text-base font-semibold'>Notification List</h3>
            </div>

            <div className='flex items-center my-8 justify-between'>
                <h3 className='font-semibold '>{"188"} Notification</h3>
                <div>
                    <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search...' />

                </div>
            </div>



            <TabBar onChange={(val: string) => setActiveTab(val)} tabs={tabs} />

            {
                isLoading ? <PageLoader /> :
                    <>
                        <div className='py-6 divide-y'>
                            <Notification isFavourite={false} />
                            <Notification isFavourite={true} />
                            <Notification isFavourite={false} />

                        </div>
                        <div className='flex justify-center md:justify-end'>
                            <Pagination setPage={(page: any) => setCurrentPage(page)} page={currentPage} pageSize={10} totalRows={188} loading={false} currentLength={188} />
                            {/* <Paginator  /> */}
                        </div>
                    </>
            }



        </div>
    )
}

const Notification = ({ isFavourite, }: { isFavourite: boolean }) => {
    return (
        <div className='h-[44px] flex gap-1 items-center justify-between w-full'>
            <div className='flex gap-2 items-center'>
                <input type='checkbox' className='h-4 w-4 ' />
                <button>{
                    isFavourite ? <GoStarFill size={18} color='#F8DC0B' /> : <GoStar size={18} />
                }</button>

            </div>
            <h3 className='font-semibold'>Welcome</h3>
            <div >
                <h3 className='truncate lg:whitespace-normal md:w-full lg:max-w-full max-w-40'>Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar  risus risus...</h3>
            </div>
            <div className='flex gap-2 items-center'>
                <h3 className='text-sm whitespace-nowrap'>Just Now</h3>
                <button className='h-6 flex justify-center items-center w-6 rounded-full bg-[#FBE9E9] '>
                    <GoTrash color='#D42620' />
                </button>

            </div>



        </div>
    )
}



export default Notifications