export default function AddField({ name, value, setter, type = 'text'}) {

    return (
        <>
            <label className="col-sm-3 col-form-label">
                { name }
            </label>

            <div className="col-sm-9 mb-2">
                <div className="input-group mb-1">
                    <input
                        type={type}
                        className="form-control"
                        {...(value != null && { value })}
                        onChange={ (event) => setter(event.target.value) }
                        required
                    />
                </div>
            </div>
        </>
    )

}