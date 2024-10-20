import React from "react"
import { logout } from "../../../utils/utils";

function Item ({ name, icon, path }) {

    return (

        <>
            {
                (name.toLowerCase() !== "logout") ?
                    <li>
                        <a className= { (path === window.location.pathname ? 'selected' : '') } href={ path }>
                            <i className={ "icon" } >{ icon } </i>
                            <span className="text nav-text">{ name }</span>
                        </a>
                    </li>
                    : (
                        <li onClick={logout}>
                            <a href={ path } className={" bg-danger"}>
                                <i className={ "icon" } >{ icon } </i>
                                <span className="text nav-text">{ name }</span>
                            </a>
                        </li>
                    )
            }
        </>

    )
}

export default Item;