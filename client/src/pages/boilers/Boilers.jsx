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
import { FiAlertTriangle } from "react-icons/fi";
import { getCookie } from "../../utils/cookie";
import { redirectLogin } from "../../utils/utils";

const Boilers = () => {

    setTitle("Caldaie | Gestionale Clienti");

    const [boilers, setBoilers] = useState(null);
    const notify = useContext(Notify);

    const getBoilers = () => {
        fetch(`${process.env.REACT_APP_PROXY}/api/getBoilers`, {
            method: 'POST',
            headers: {'Authorization': getCookie("token")},
            credentials: 'include'
        })
            .then(data => {
                if (data.status === 400 || data.status === 401 || data.status === 403) {
                    return redirectLogin();
                }

                return data.json();
            })
            .then(data => setBoilers(data))
            .catch(error => {
                console.error("Errore: ", error)
            });
    };

    useEffect(() => getBoilers(), [notify]);

    function getBackgroundColor(lastMaintenanceDate) {
        if (!lastMaintenanceDate) return "";

        const yearsPassed = new Date().getFullYear() - new Date(lastMaintenanceDate).getFullYear();

        if (yearsPassed < 1) return "";
        if (yearsPassed < 2) return "yellow";
        return "red";
    }

    function getMaintenanceText(boiler) {
        return <span style={{
            backgroundColor: getBackgroundColor(boiler.last_maintenance_date),
            color: getBackgroundColor(boiler.last_maintenance_date) === "" ? "white" : "black"
        }}>
            { boiler.last_maintenance_date ?
                (<>
                    { new Date(boiler.last_maintenance_date).toLocaleDateString() + " " }
                    { boiler.notes && (
                        <>
                            <FiAlertTriangle size="23" />
                            { " " + boiler.notes}
                        </>
                    )}
                </>) : "Nessuna"
            } </span>
    }

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