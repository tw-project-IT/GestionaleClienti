import React, {useContext, useEffect, useState} from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Table from "../../components/table/Table";
import {LiaClipboardListSolid} from "react-icons/lia";
import Sidebar from "../../components/sidebar/Sidebar";
import {Notify} from "../../components/notify/Notify";
import Loading from "../../components/loading/Loading";
import Error from "../Error/Error";

const Customers = () => {

    setTitle("Clienti | Gestionale Clienti");

    const [customers, setCustomers] = useState(null);
    const notify = useContext(Notify);

    useEffect(() => {
        const getBuyers = () => {
            fetch(`${process.env.REACT_APP_PROXY}/api/getCustomers`, {
                method: 'POST'
                //headers: {'Authorization': getCookie("token")} // TODO: Token
            })
                .then(result => result.json())
                .then(data => {
                    if (data.error)
                        return notify.showMessage("error", data.error);

                    setCustomers(data);
                })
                .catch(error => {
                    console.error("Errore: ", error)
                });
        };

        getBuyers();
    }, [notify]);

    return (
        <>
            <Loading loaded={customers === null} />

            {
                (customers === null)
                    ? <Error />
                    : <>
                        <Sidebar/>

                        <section className="right-container">

                            <div className="container-fluid pt-2 px-4">
                                <h1 className={"text-light"}>Lista clienti</h1>

                                <Table
                                    name={'Lista clienti'}
                                    nameIcon={<LiaClipboardListSolid/>}
                                    headers={['Nome', 'Cognome', 'Telefono', 'Email', 'Indirizzo']}
                                    //filters={['Manutenzione', 'Urgente']}
                                    itemsPerPage = {'5'}
                                    order = {"desc"}
                                    values={ customers && customers.map((customer) => [
                                        customer.firstname,
                                        customer.lastname,
                                        customer.telephone,
                                        customer.email,
                                        customer.address
                                    ]) }
                                />
                            </div>
                        </section>
                    </>
            }
        </>
    )
}

export default Customers;