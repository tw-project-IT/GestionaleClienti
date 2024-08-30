import React, {useContext, useEffect, useState} from "react";
import { Notify } from "../notify/Notify";
import AddField from "./AddField";
import AddFieldSelect from "./AddFieldSelect";

function AddBoiler ()  {

    const [customers, setCustomers] = useState([]);

    const [customer, setCustomer] = useState([]);
    const [model, setModel] = useState("");
    const [registryCode, setRegistryCode] = useState("");
    const [installationDate, setInstallationDate] = useState("");

    const notify = useContext(Notify);

    useEffect(() => {
        const getCustomers = () => {
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

        getCustomers();
    }, [notify]);

    const handleSave = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
                 /*'Authorization': getCookie("token")*/
             },
            body: JSON.stringify({
                customer,
                model,
                registryCode,
                installationDate
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/addBoiler`, requestOptions)
            .then(result => result.json())
            .then(data => {
                if (data.error)
                    return notify.showMessage("error", data.error);

                notify.showMessage("success", "Caldaia aggiunta con successo!");

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
                data-bs-target= { "#createBuyer" }
            >
                Aggiungi caldaia
            </button>

            <div
                className="modal fade"
                id={ "createBuyer" }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Nuova Caldaia" }
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
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-outline-success" type="submit" data-bs-dismiss="modal">
                                    Aggiungi
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBoiler;