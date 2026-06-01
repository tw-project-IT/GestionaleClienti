import React, {useContext} from "react";
import {Notify} from "../notify/Notify";
import {redirectLogin} from "../../utils/utils";
import {FiTrash2} from "react-icons/fi";

function DeleteCustomer({ callBack, customer }) {

    const notify = useContext(Notify);

    const handleDelete = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: customer.id
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/deleteCustomer`, requestOptions)
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

                notify.showMessage("success", "Cliente eliminato con successo!");
                callBack();
            })
            .catch(error => {
                console.error("Errore: ", error)
            });
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target={ "#deleteCustomer" + customer.id }
                aria-label="Elimina cliente"
            >
                <FiTrash2 />
            </button>

            <div
                className="modal fade"
                id={ "deleteCustomer" + customer.id }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Elimina Cliente" }
                            </h1>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Annulla"
                            />
                        </div>

                        <form onSubmit={ handleDelete }>
                            <div className="modal-body">
                                Confermi di voler eliminare il cliente
                                { " " + customer.firstname + " " + customer.lastname + " (" + customer.id + ")" }?
                                {
                                    <p className="mt-2 mb-0">
                                        Verranno eliminate anche le eventuali caldaie associate (e le relative manutenzioni).
                                    </p>
                                }
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-outline-danger" type="submit" data-bs-dismiss="modal">
                                    Conferma
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteCustomer;
