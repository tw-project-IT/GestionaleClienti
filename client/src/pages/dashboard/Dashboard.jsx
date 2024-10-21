import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Sidebar from "../../components/sidebar/Sidebar";
import Statistic from "../../components/statistic/Statistic";
import {LuListTodo} from "react-icons/lu";
import {Notify} from "../../components/notify/Notify";
import {getMaintenanceText, redirectLogin} from "../../utils/utils";
import Table from "../../components/table/Table";
import {LiaClipboardListSolid} from "react-icons/lia";
import Loading from "../../components/loading/Loading";
import Error from "../Error/Error";

const Dashboard = () => {

    setTitle("Dashboard | Gestionale Clienti");

    const [boilersToDo, setBoilersToDo] = useState(null);
    const [boilersWithNotes, setBoilersWithNotes] = useState(null);

    const notify = useContext(Notify);

    useEffect(() => {
        const getBoilers = () => {
            fetch(`${process.env.REACT_APP_PROXY}/api/getBoilers`, {
                method: 'POST',
                credentials: 'include'
            })
                .then(data => {
                    if (data.status === 400 || data.status === 401 || data.status === 403) {
                        redirectLogin();
                        return;
                    }

                    return data.json();
                })
                .then(data => {
                    setBoilersWithNotes(data.filter(boiler => boiler.notes))
                    setBoilersToDo(data.filter(boiler => !boiler.last_maintenance_date));
                })
                .catch(error => {
                    console.error("Errore: ", error)
                });
        };

        getBoilers();
    }, [notify]);

    return (
        <>
            <Loading loaded={boilersToDo === null}/>

            {
                (boilersToDo === null)
                    ? <Error/>
                    : <>
                        <Sidebar/>
                        <section className="right-container">

                            <div className="container-fluid pt-2 px-4">
                                <h1 className={"text-light"}>Dashboard gestionale</h1>

                                <div className="row g-2 pt-2">
                                    <Statistic
                                        name="Caldaie da fare"
                                        value={boilersToDo.length}
                                        col="col-sm-6 col-xl-3"
                                        icon={<LuListTodo/>}
                                        iconColor="#FFF2C6"
                                        iconBg="#FBC02D"
                                    />
                                </div>

                                <div className="row g-2 pt-2">
                                    <div className={"col-sm-12 col-lg-12 col-xl-12"}>
                                        <Table
                                            name={'Lista caldaie da fare'}
                                            nameIcon={<LiaClipboardListSolid/>}
                                            headers={['Id', 'Cliente', 'Modello', 'Cod. catasto', 'Installazione', 'Ultima manutenzione']}
                                            itemsPerPage={'10'}
                                            order={"desc"}
                                            searchEnabled="false"
                                            values={boilersToDo && boilersToDo.map((boiler) => [
                                                boiler.id,
                                                boiler.customer,
                                                boiler.model,
                                                boiler.registry_code,
                                                new Date(boiler.installation_date).toLocaleDateString(),
                                                getMaintenanceText(boiler)
                                            ])}
                                        />

                                    </div>

                                    <div className={"col-sm-12 col-lg-12 col-xl-12"}>
                                        <Table
                                            name={'Lista caldaie con note'}
                                            nameIcon={<LiaClipboardListSolid/>}
                                            headers={['Id', 'Cliente', 'Modello', 'Cod. catasto', 'Installazione', 'Ultima manutenzione']}
                                            itemsPerPage={'10'}
                                            order={"desc"}
                                            searchEnabled="false"
                                            values={boilersWithNotes && boilersWithNotes.map((boiler) => [
                                                boiler.id,
                                                boiler.customer,
                                                boiler.model,
                                                boiler.registry_code,
                                                new Date(boiler.installation_date).toLocaleDateString(),
                                                getMaintenanceText(boiler)
                                            ])}
                                        />
                                    </div>
                                </div>

                            </div>
                        </section>
                    </>
            }
        </>
    )
}

export default Dashboard;