import React from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {

    setTitle("Dashboard | Gestionale Clienti");

    return (
        <div>
            <Sidebar/>
            <section className="right-container">

                <div className="container-fluid pt-2 px-4">
                    <h1 className={"text-light"}>Dashboard gestionale</h1>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;