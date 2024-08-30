export default function AddFieldSelect ({ name, value, setter, values, mapper}) {

    return (
        <>
            <label className="col-sm-3 col-form-label">
                { name }
            </label>

            <div className="col-sm-9 mb-2">
                <div className="input-group mb-1">
                    <select
                        className= { "form-select" }
                        value={ value }
                        onChange={ (event) => setter(event.target.value) }
                    >
                        <option value={"null"} selected>Seleziona il { name }</option>
                        { values && values.map((value) => (
                            <option value={value.id} key = {value.id}>{mapper(value)}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )

}