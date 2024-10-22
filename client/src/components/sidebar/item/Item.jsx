import React, {useContext} from "react"
import {redirect} from "../../../utils/utils";
import {Notify} from "../../notify/Notify";

function Item({name, icon, path}) {

    const notify = useContext(Notify);

    const logout = () => {

        fetch(`${process.env.REACT_APP_PROXY}/api/logout`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200) {
                    return data.json();
                }

                redirect("/login");
            }).then(data => notify.showMessage("error", data.message))
    }

    return (

        <>
            {
                (name.toLowerCase() !== "logout") ?
                    <li>
                        <a className={(path === window.location.pathname ? 'selected' : '')} href={path}>
                            <i className={"icon"}>{icon} </i>
                            <span className="text nav-text">{name}</span>
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