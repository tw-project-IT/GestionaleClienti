function Statistic ({ name, value, col, icon, iconColor, iconBg }) {
    return (

        <div className={" " + col}>
            <div className= "rounded-3 d-flex align-items-center justify-content-between p-4 h-100 bg-dark">

                <div className="rounded p-4 justify-content-center align-items-center d-flex" style={{ width: "70px", height: "70px", backgroundColor: iconColor}}>
                    <i className={"h2"} style={{ color: iconBg }}>{icon}</i>
                </div>
                <div className="ms-3">
                    <h4 className="mb-1 text-white text-end"> { value } </h4>
                    <p className="fw-light mb-0 text-white text-end"> { name } </p>
                </div>

            </div>
        </div>

    )
}

export default Statistic;