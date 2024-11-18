import React from 'react'
import { LayoutOutlet } from '../../../Routes/Layout';
import { useLocation } from "react-router-dom";
import DashboardHeader from '../../../containers/dashboard/Header';

const SetupLayout = () => {
    return (
        <div>
            <DashboardHeader title={"Welcome to Ajosquad"} />
            <LayoutOutlet />
        </div>
    )
}

export default SetupLayout