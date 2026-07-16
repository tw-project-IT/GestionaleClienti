import React, {useContext, useEffect, useState} from "react";
import {Notify} from "../notify/Notify";
import AddField from "./AddField";
import AddFieldSelect from "./AddFieldSelect";
import {redirectLogin} from "../../utils/utils";
import {FiEdit2} from "react-icons/fi";

function EditBoiler ({ callBack, boiler })  {

    const [customers, setCustomers] = useState([]);

    const [customer, setCustomer] = useState(boiler.customer_id || "");
    const [model, setModel] = useState(boiler.model || "");
    const [registryCode, setRegistryCode] = useState(boiler.registry_code || "");
    const [installationDate, setInstallationDate] = useState(
        boiler.installation_date ? new Date(boiler.installation_date).toISOString().slice(0, 10) : ""
    );
    const [other, setOther] = useState(boiler.other || "");

    const notify = useContext(Notify);

    useEffect(() => {
        const getCustomers = () => {
            fetch(`${process.env.REACT_APP_PROXY}/api/getCustomers`, {
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
                .then(data => setCustomers(data))
                .catch(error => {
                    console.error("Errore: ", error)
                });
        };

        getCustomers();
    }, [notify]);

    const resetFields = () => {
        setCustomer(boiler.customer_id || "");
        setModel(boiler.model || "");
        setRegistryCode(boiler.registry_code || "");
        setInstallationDate(
            boiler.installation_date ? new Date(boiler.installation_date).toISOString().slice(0, 10) : ""
        );
        setOther(boiler.other || "");
    };

    const handleSave = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: boiler.id,
                customer,
                model,
                registryCode,
                installationDate,
                other
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/editBoiler`, requestOptions)
            .then(data => {
                if (data.status === 401 || data.status === 403) {
                    redirectLogin();
                    return;
                }

                return data.json();
            })
            .then(data => {
                if (data.error)
                    return notify.showMessage("error", data.error);

                notify.showMessage("success", "Caldaia modificata con successo!");
                callBack();
            })
            .catch(error => {
                console.error("Errore: ", error)
            });
    };


    return (
        <div>
            <button
                type="button"
                className="btn btn-sm btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target= { "#editBoiler" + boiler.id }
                aria-label="Modifica caldaia"
                onClick={ resetFields }
            >
                <FiEdit2 />
            </button>

            <div
                className="modal fade"
                id={ "editBoiler" + boiler.id }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Modifica Caldaia" }
                            </h1>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Annulla"
                            />
                        </div>

                        <form onSubmit={ handleSave }>
                            <div className="modal-body">

                                <div className="form-group row">

                                    <AddFieldSelect name="Cliente"
                                              value={customer}
                                              setter={setCustomer}
                                              values={customers}
                                              mapper={(customer) => `${customer.firstname} ${customer.lastname}`}
                                    />

                                    <AddField name="Modello"
                                              value={model}
                                              setter={setModel}
                                    />

                                    <AddField name="Cod. Catasto"
                                              value={registryCode}
                                              setter={setRegistryCode}
                                    />

                                    <AddField name="Data installazione"
                                              value={installationDate}
                                              setter={setInstallationDate}
                                              type="date"
                                    />

                                    <AddField name="Altro"
                                              value={other}
                                              setter={setOther}
                                    />
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-outline-success" type="submit" data-bs-dismiss="modal">
                                    Salva
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBoiler;
