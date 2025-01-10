import React from 'react'
import { Label } from '../../../../components/Label/Label';
import { mockData } from '../../../../samples/mockdata';
import { Table, TableEmpty } from '../../../../components/Table/Table';
import SearchInput from '../../../../components/FormInputs/SearchInput';

const SquadInformation = () => {
    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Payment Description",
            view: (row: any) => <div>{row.position}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>{row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{row.date}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];
    return (
        <div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>Squad</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>


                </div>


                {
                    [].length === 0 ? <TableEmpty title='No squad yet' image='/empty-states/transaction.png' subtitle="This user has not joined a squad" /> : <Table
                        data={mockData.data}
                        columns={columns}
                        loading={false}
                        pagination={
                            mockData.pagination
                        }

                    />
                }
            </div>
        </div>
    )
}

export default SquadInformation