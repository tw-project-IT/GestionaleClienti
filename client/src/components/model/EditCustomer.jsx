import React, {useContext, useState} from "react";
import { Notify } from "../notify/Notify";
import AddField from "./AddField";
import {redirectLogin} from "../../utils/utils";
import {FiEdit2} from "react-icons/fi";

function EditCustomer ({ callBack, customer })  {

    const [firstName, setFirstName] = useState(customer.firstname || "");
    const [lastName, setLastName] = useState(customer.lastname || "");
    const [telephone, setTelephone] = useState(customer.telephone || "");
    const [email, setEmail] = useState(customer.email || "");
    const [address, setAddress] = useState(customer.address || "");

    const notify = useContext(Notify);

    const resetFields = () => {
        setFirstName(customer.firstname || "");
        setLastName(customer.lastname || "");
        setTelephone(customer.telephone || "");
        setEmail(customer.email || "");
        setAddress(customer.address || "");
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
                id: customer.id,
                firstName,
                lastName,
                telephone: telephone || null,
                email: email || null,
                address: address || null
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/editCustomer`, requestOptions)
            .then(data => {
                if ( data.status === 401 || data.status === 403) {
                    redirectLogin();
                    return;
                }

                return data.json();
            }).then(data => {
                if (data.error)
                    return notify.showMessage("error", data.error);

                notify.showMessage("success", "Cliente modificato con successo!");
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
                data-bs-target= { "#editCustomer" + customer.id }
                aria-label="Modifica cliente"
                onClick={ resetFields }
            >
                <FiEdit2 />
            </button>

            <div
                className="modal fade"
                id={ "editCustomer" + customer.id }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Modifica Cliente" }
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

export default EditCustomer;
