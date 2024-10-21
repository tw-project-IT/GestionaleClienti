import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import { setTitle } from "../../utils/title";
import Table from "../../components/table/Table";
import { LiaClipboardListSolid } from "react-icons/lia";
import Sidebar from "../../components/sidebar/Sidebar";
import { Notify } from "../../components/notify/Notify";
import Loading from "../../components/loading/Loading";
import Error from "../Error/Error";
import AddBoiler from "../../components/model/AddBoiler";
import AddMaintenance from "../../components/model/AddMaintenance";
import {getMaintenanceText, redirectLogin} from "../../utils/utils";

const Boilers = () => {

    setTitle("Caldaie | Gestionale Clienti");

    const [boilers, setBoilers] = useState(null);
    const notify = useContext(Notify);

    const getBoilers = () => {
        fetch(`${process.env.REACT_APP_PROXY}/api/getBoilers`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(data => {
                if (data.status === 401 || data.status === 403) {
                    //redirectLogin();
                    return;
                }

                return data.json();
            })
            .then(data => setBoilers(data))
            .catch(error => {
                console.error("Errore: ", error)
            });
    };

    useEffect(() => getBoilers(), [notify]);

    return (
        <>
            <Loading loaded={boilers === null} />

            {
                (boilers === null)
                    ? <Error />
                    : <>
                        <Sidebar/>

                        <section className="right-container">

                            <div className="container-fluid pt-2 px-4">
                                <h1 className={"text-light"}>Lista caldaie</h1>

                                <Table
                                    name={'Lista caldaie'}
                                    nameIcon={<LiaClipboardListSolid/>}
                                    headers={['Id', 'Cliente', 'Modello', 'Cod. catasto', 'Installazione', 'Ultima manutenzione']}
                                    startItems={[
                                        <AddBoiler/>,
                                        <AddMaintenance />
                                    ]}
                                    itemsPerPage = {'5'}
                                    order = {"desc"}
                                    values={ boilers && boilers.map((boiler) => [
                                        boiler.id,
                                        boiler.customer,
                                        boiler.model,
                                        boiler.registry_code,
                                        new Date(boiler.installation_date).toLocaleDateString(),
                                        getMaintenanceText(boiler)
                                    ]) }
                                />

                            </div>
                        </section>
                    </>
            }
        </>
    )
}

export default Boilers;