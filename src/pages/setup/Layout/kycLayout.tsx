import React from 'react'
import { LayoutOutlet } from '../../../Routes/Layout';
import { useLocation } from "react-router-dom";
import DashboardHeader from '../../../containers/dashboard/Header';

const KycLayout = () => {
    return (
        <div className='bg-[#F2F2F2] min-h-screen'>
            <LayoutOutlet />
        </div>
    )
}

export default KycLayout