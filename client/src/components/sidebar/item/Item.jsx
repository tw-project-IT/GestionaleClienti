import React from "react"
function Item ({ name, icon, path }) {
    console.log(name.toLowerCase())

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
                        <li>
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