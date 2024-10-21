import './style.scss';

import {AiOutlineDashboard } from 'react-icons/ai';
import { BiLogOutCircle, BiChevronRight } from 'react-icons/bi';

import React, {useEffect, useState} from "react";

import Item from "./item/Item";
import {LiaClipboardListSolid, LiaShoppingBasketSolid} from "react-icons/lia";
import {getCookie, setCookie} from "../../utils/cookie";

function Sidebar()  {

    const [open, setOpen] = useState(true);
    //const username = getCookie("email"); // TODO: Login fetch data
    const username = "email@gmail.com";

    useEffect(() => {
        const isOpen = getCookie("sidebar");
        if (isOpen === "false") {
            setOpen(false);
        }
    }, []);

    useEffect(() => setCookie("sidebar", open, 7), [open]);

    return (
        <nav className={ "sidebar " + ((!open) ? "sidebar-close" : "") }>

            <header>
                <div className="image-text">
                    <div className="text logo-text">
                        <span className="name"> { username } </span>
                    </div>
                </div>
                <i className="toggle" onClick={ () => setOpen(!open) }> <BiChevronRight/></i>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">

                        <Item
                            name='Dashboard'
                            icon={< AiOutlineDashboard /> }
                            path={ '/' }
                        />

                        <Item
                            name='Clienti'
                            icon={< LiaShoppingBasketSolid /> }
                            path={ '/customers' }
                        />

                        <Item
                            name='Caldaie'
                            icon={< LiaClipboardListSolid /> }
                            path={ '/boilers' }
                        />

                    </ul>
                </div>

                <div className="bottom-content">
                    <Item
                        name='Logout'
                        icon ={< BiLogOutCircle /> }
                        path={ '/login' }
                    />
                </div>

            </div>
        </nav>
    )
}

export default Sidebar;