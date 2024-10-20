import React, {useContext, useEffect, useState} from "react";
import {Notify} from "../notify/Notify";
import AddField from "./AddField";
import AddFieldSelect from "./AddFieldSelect";
import {getCookie} from "../../utils/cookie";
import {redirectLogin} from "../../utils/utils";

function AddMaintenance() {

    const [boilers, setBoilers] = useState([]);

    const [boiler, setBoiler] = useState([]);
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    const notify = useContext(Notify);

    useEffect(() => {
        const getBoilers = () => {
            fetch(`${process.env.REACT_APP_PROXY}/api/getBoilers`, {
                method: 'POST',
                headers: {'Authorization': getCookie("token")}
            })
                .then(data => {
                    if (data.status === 400 || data.status === 401 || data.status === 403) {
                        return redirectLogin();
                    }

                    return data.json();
                })
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

    const handleSave = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': getCookie("token")
             },
            body: JSON.stringify({
                boiler,
                date,
                notes: notes || null
            })
        };

        fetch(`${process.env.REACT_APP_PROXY}/api/addMaintenance`, requestOptions)
            .then(data => {
                if (data.status === 400 || data.status === 401 || data.status === 403) {
                    return redirectLogin();
                }

                return data.json();
            })
            .then(data => {
                if (data.error)
                    return notify.showMessage("error", data.error);

                notify.showMessage("success", "Manutenzione aggiunta con successo!");

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
                data-bs-target= { "#createMaintenance" }
            >
                Aggiungi manutenzione
            </button>

            <div
                className="modal fade"
                id={ "createMaintenance" }
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="content">
                                { "Nuova Manutenzione" }
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

                                    <AddFieldSelect name="Caldaia"
                                              value={boiler}
                                              setter={setBoiler}
                                              values={boilers}
                                              mapper={(boiler) => `${boiler.customer} - ${boiler.model} (${boiler.id})`}
                                    />

                                    <AddField name="Data"
                                              value={date}
                                              setter={setDate}
                                              type="date"
                                    />

                                    <AddField name="Note"
                                              value={notes}
                                              setter={setNotes}
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

export default AddMaintenance;