import { useState } from 'react'
import { Table, TableEmpty } from '../../components/Table/Table';
import SearchInput from '../../components/FormInputs/SearchInput';
import { InfoCard } from '../../components/InfoCard/InfoCard2';
import { Label } from '../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { StaffService } from '../../services/staff';
import PageLoader from '../../components/spinner/PageLoader';
import { fDate } from '../../utils/formatTime';
import { generateSerialNumber } from '../../utils/helpers';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Modal from '../../components/Modal/Modal';
import AddStaffForm from '../../components/Staff/AddStaffForm';
import StaffProfile from '../../components/Staff/StaffProfile';

const StaffManagement = () => {
    const navigate = useNavigate();

    const [showAddStaffForm, setShowAddStaffForm] = useState(false);
    const [showStaffProfile, setShowStaffProfile] = useState(false);
    const [currentStaffID, setCurrentStaffID] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('')

    const { data: count, isLoading, error } = useQuery(['admin-staff-count'], StaffService.staffCount);
    const { data: staffs, isLoading: isMembersLoading } = useFetchWithParams([`query-all-staffs`, {
        search: search,
        page: currentPage
    }], StaffService.getAllStaff, {
        onSuccess: (data: any) => {
        }
    })

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage
            })}</div>
        },
        {
            header: "Staff ID",
            view: (row: any) => <div>{row.id}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row?.email_address}</div>,
        },
        {
            header: "Access",
            view: (row: any) => <div className='capitalize'>{row?.role}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{fDate(row?.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];
    return (
        <div className='px-3  md:px-6'>
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between flex-wrap items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and oversee all your User in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        View and manage all user information, interactions, and activities from a single, intuitive dashboard.
                    </p>
                </div>

                <button onClick={() => setShowAddStaffForm(!showAddStaffForm)} className='h-[44px] border mt-5 lg:mt-0 border-primary px-4 py-2 rounded' >Add Staff <span></span></button>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard header="Total Staff" isLoading={isLoading} iconName='profile-2user' value={count && count?.data?.count} />
            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Staff</h3>
                    <div className='flex items-center gap-2'>
                        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>
                </div>
                {
                    isMembersLoading ? <PageLoader /> :
                        staffs && staffs.data?.data.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
                            data={staffs.data.data}
                            columns={columns}
                            loading={false}
                            clickRowAction={(row) => {
                                setCurrentStaffID(row.id);
                                setShowStaffProfile(true);
                            }}
                            pagination={
                                {
                                    page: currentPage,
                                    setPage: (page) => setCurrentPage(page),
                                    totalRows: staffs?.total,
                                }
                            }

                        />
                }
            </div>
            <Modal open={showAddStaffForm} onClick={() => setShowAddStaffForm(!showAddStaffForm)} >
                <AddStaffForm closeModal={() => setShowAddStaffForm(!showAddStaffForm)} />
            </Modal>
            <Modal open={showStaffProfile} onClick={() => setShowStaffProfile(!showStaffProfile)} >
                <StaffProfile id={currentStaffID} closeModal={() => setShowStaffProfile(!showStaffProfile)} />
            </Modal>
        </div>
    )
}

export default StaffManagement