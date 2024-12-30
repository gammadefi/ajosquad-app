import React, { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import { Label } from '../../components/Label/Label'
import { mockData } from '../../samples/mockdata'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { ActivityService } from '../../services/activity'
import PageLoader from '../../components/spinner/PageLoader'
import { generateSerialNumber } from '../../utils/helpers'
import { fDate } from '../../utils/formatTime'

const AccountActivity = () => {
    const [search, setSearch] = useState("")
    const columns = [
        {
            header: "S/N",
           view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                           pageSize: 10,
                           currentPage
                       })}</div>
        },
        {
            header: "Account ID",
            view: (row: any) => <div>{row.userId}</div>,
        },
        {
            header: "Activity",
            view: (row: any) => <div>{row.action}</div>,
        },
        {
            header: "Activity ID",
            view: (row: any) => <div>{row.id}</div>,
        },
        {
            header: "Date of Description",
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: activities, isLoading, refetch } = useFetchWithParams(
        ["query-admin-activities", {
            page: currentPage,
            pageSize,
            search,
        }],
        ActivityService.getActivities,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )
    console.log(activities)

    const handleCurrentPage = (val: any) => {
        setCurrentPage(val);
        // setFilterParams({ ...filterParams, pageNum: val - 1 });
    };

    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Audit</span> Track every activity that occur on your platform.</h3>

                </div>

            </div>


            <div className='my-8 flex justify-between items-center '>
                <h3 className='text-xl font-semibold'>Account Activity</h3>

                <div className='flex items-center gap-2'>
                    <SearchInput value={search} onChange={(e) =>  setSearch(e.target.value)} placeholder='Search...' />
                    {/* <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button> */}
                </div>


            </div>

            {
                isLoading ? <PageLoader /> :
                activities.data.length === 0 ? <TableEmpty title='No Activity Yet' image='/empty-states/payout.png' subtitle="On this page, you'll find a record of all activities on your platform." /> : <Table
                    data={activities.data}
                    columns={columns}
                    loading={false}
                    pagination={
                        {
                            page: currentPage,
                            pageSize,
                            setPage: handleCurrentPage,
                            totalRows: activities.pagination.total
                        }

                    }

                />
            }




        </div>
    )
}

export default AccountActivity