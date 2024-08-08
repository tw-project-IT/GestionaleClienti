function Error () {
    return (

        <div>
            <div className="d-flex align-items-center justify-content-center vh-100 text-light">
                <div className="text-center">
                    <h1 className="display-1 text-danger fw-bold">Opps!</h1>
                    <p className="fs-3">Si è verificato un problema.</p>
                    <p className="lead">La pagina che stai cercando non esiste.</p>
                    <a href="/login" className="btn btn-outline-light">Login</a>
                </div>
            </div>

        </div>

    )
}

export default Error;