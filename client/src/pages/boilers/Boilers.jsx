import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Table from "../../components/table/Table";
import {LiaClipboardListSolid} from "react-icons/lia";
import Sidebar from "../../components/sidebar/Sidebar";
import {Notify} from "../../components/notify/Notify";
import Loading from "../../components/loading/Loading";
import Error from "../Error/Error";
import AddBoiler from "../../components/model/AddBoiler";

const Boilers = () => {

    setTitle("Caldaie | Gestionale Clienti");

    const [boilers, setBoilers] = useState(null);
    const notify = useContext(Notify);

    useEffect(() => {
        const getBoilers = () => {
            fetch(`${process.env.REACT_APP_PROXY}/api/getBoilers`, {
                method: 'POST'
                //headers: {'Authorization': getCookie("token")} // TODO: Token
            })
                .then(result => result.json())
                .then(data => {
                    if (data.error)
                        return notify.showMessage("error", data.error);

                    setBoilers(data);
                })
                .catch(error => {
                    console.error("Errore: ", error)
                });
        };

        getBoilers();
    }, [notify]);

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
                                    headers={['Cliente', 'Modello', 'Cod. catasto', 'Installazione']}
                                     startItem={
                                        <AddBoiler/>
                                    }
                                    itemsPerPage = {'5'}
                                    order = {"desc"}
                                    values={ boilers && boilers.map((boiler) => [
                                        boiler.customer,
                                        boiler.model,
                                        boiler.registry_code,
                                        new Date(boiler.installation_date).toLocaleDateString(),
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