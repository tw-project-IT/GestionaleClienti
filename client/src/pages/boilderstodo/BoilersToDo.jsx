import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Sidebar from "../../components/sidebar/Sidebar";
import {Notify} from "../../components/notify/Notify";
import {getDiffDays, getMaintenanceText, redirectLogin} from "../../utils/utils";
import Table from "../../components/table/Table";
import {LiaClipboardListSolid} from "react-icons/lia";
import Loading from "../../components/loading/Loading";
import Error from "../error/Error";

const BoilersToDo = () => {

    setTitle("Manutenzioni da eseguire | Gestionale Clienti");

    const [boilersToDo, setBoilersToDo] = useState(null);

    const notify = useContext(Notify);

    useEffect(() => {
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
                .then(data => {
                    setBoilersToDo(data.filter(boiler => {
                        if (!boiler.last_maintenance_date) return true;

                        const daysPassed = getDiffDays(boiler.last_maintenance_date);

                        return daysPassed > 365;
                    }));
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
                                <h1 className={"text-light"}>Manutenzioni da eseguire</h1>

                                <div className="row g-2 pt-2">
                                    <div className={"col-sm-12 col-lg-12 col-xl-12"}>
                                        <Table
                                            name={'Lista caldaie da fare'}
                                            nameIcon={<LiaClipboardListSolid/>}
                                            headers={['Id', 'Cliente', 'Modello', 'Cod. catasto', 'Installazione', 'Altro', 'Ultima manutenzione']}
                                            itemsPerPage={'20'}
                                            order={"desc"}
                                            searchEnabled="false"
                                            values={boilersToDo && boilersToDo.map((boiler) => [
                                                boiler.id,
                                                boiler.customer,
                                                boiler.model,
                                                boiler.registry_code,
                                                new Date(boiler.installation_date).toLocaleDateString(),
                                                boiler.other,
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

export default BoilersToDo;