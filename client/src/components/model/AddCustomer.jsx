import React, {useContext, useState} from "react";
import { Notify } from "../notify/Notify";
import AddField from "./AddField";
import {getCookie} from "../../utils/cookie";
import {redirectLogin} from "../../utils/utils";

function AddCustomer ({ callBack })  {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const notify = useContext(Notify);

    const handleSave = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': getCookie("token")
             },
            body: JSON.stringify({
                firstName,
                lastName,
                telephone: telephone || null,
                email: email || null,
                address: address || null
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/addCustomer`, requestOptions)
            .then(data => {
                if (data.status === 400 || data.status === 401 || data.status === 403) {
                    return redirectLogin();
                }

                return data.json();
            }).then(data => {
                if (data.error)
                    return notify.showMessage("error", data.error);

                notify.showMessage("success", "Cliente aggiunto con successo!");
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
                data-bs-target= { "#createCustomer" }
            >
                Aggiungi cliente
            </button>

            <div
                className="modal fade"
                id={ "createCustomer" }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Nuovo Cliente" }
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

                                    <AddField name="Nome"
                                              value={firstName}
                                              setter={setFirstName}
                                    />

                                    <AddField name="Cognome"
                                              value={lastName}
                                              setter={setLastName}
                                    />

                                    <AddField name="Telefono"
                                              value={telephone}
                                              setter={setTelephone}
                                    />

                                    <AddField name="Email"
                                              value={email}
                                              setter={setEmail}
                                    />

                                    <AddField name="Indirizzo"
                                              value={address}
                                              setter={setAddress}
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

export default AddCustomer;