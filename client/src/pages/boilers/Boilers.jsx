import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import { setTitle } from "../../utils/title";
import Table from "../../components/table/Table";
import { LiaClipboardListSolid } from "react-icons/lia";
import Sidebar from "../../components/sidebar/Sidebar";
import { Notify } from "../../components/notify/Notify";
import Loading from "../../components/loading/Loading";
import Error from "../error/Error";
import AddBoiler from "../../components/model/AddBoiler";
import AddMaintenance from "../../components/model/AddMaintenance";
import EditBoiler from "../../components/model/EditBoiler";
import DeleteBoiler from "../../components/model/DeleteBoiler";
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
                    redirectLogin();
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
                                    headers={['Id', 'Cliente', 'Modello', 'Cod. catasto', 'Installazione', 'Altro', 'Ultima manutenzione', 'Azioni']}
                                    startItems={[
                                        <AddBoiler callBack={getBoilers}/>,
                                        <AddMaintenance callBack={getBoilers} boilers={boilers}/>
                                    ]}
                                    itemsPerPage = {'20'}
                                    order = {"desc"}
                                    values={ boilers && boilers.map((boiler) => [
                                        boiler.id,
                                        boiler.customer,
                                        boiler.model,
                                        boiler.registry_code,
                                        new Date(boiler.installation_date).toLocaleDateString(),
                                        boiler.other,
                                        getMaintenanceText(boiler),
                                        <div className="d-flex gap-2">
                                            <EditBoiler callBack={getBoilers} boiler={boiler}/>
                                            <DeleteBoiler callBack={getBoilers} boiler={boiler}/>
                                        </div>
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