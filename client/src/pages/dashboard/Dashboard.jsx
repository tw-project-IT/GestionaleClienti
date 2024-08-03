import React from 'react';

import './style.scss';
import {setTitle} from "../../utils/title";
import Table from "../../components/table/Table";
import {LiaClipboardListSolid} from "react-icons/lia";

const Dashboard = () => {

    setTitle("Dashboard | Gestionale Clienti");

    return (
        <div>
            <h1>Dashboard gestionale</h1>
            <Table
                name={'Lista clienti'}
                nameIcon={<LiaClipboardListSolid/>}
                headers={['Nome', 'Cognome', 'Telefono', 'Email', 'Indirizzo', 'Modello caldaia', 'Cod catasto']}
                //filters={['Manutenzione', 'Urgente']}
                itemsPerPage = {'5'}
                order = {"desc"}
                values={
                    [
                        ["Davide", "Paolazzi", "123456789", "paola@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola2@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola3@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola4@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola5@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola6@gmail.com", "Via ciao 2", "", ""],
                        ["Davide", "Paolazzi", "123456789", "paola7@gmail.com", "Via ciao 2", "", ""],
                    ]
                }
            />
        </div>
    )
}

export default Dashboard;