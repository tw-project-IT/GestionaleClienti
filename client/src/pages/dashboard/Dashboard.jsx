import React from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";

const Dashboard = () => {

    setTitle("Dashboard | Gestionale Clienti");

    return (
        <div>
            <h1>Dashboard gestionale</h1>
        </div>
    )
}

export default Dashboard;