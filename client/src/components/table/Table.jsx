import { ImFilter } from "react-icons/im";
import {useEffect, useState} from "react";

function Table({ nameIcon, name, startItem, filters, headers, values, itemsPerPage, searchEnabled, paginationEnabled, order }) {

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [sortedValues, setSortedValues] = useState([]);

    useEffect(() => {
        const sortedCopy = [...values];

        if (order === 'asc') {
            sortedCopy.sort((first, second) => second - first);
        } else {
            sortedCopy.sort((first, second) => first - second);
        }

        setSortedValues(sortedCopy);
    }, [order, values]);


    const filteredValues = sortedValues.filter(value => {
        if (value === null) {
            return false;
        }

        const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter => {
            const filterText = typeof filter === 'object' ? filter.props.children.toString() : filter.toString();
            return value.some(subValue => {
                if (subValue === null) {
                    return false;
                }

                const subValueText = typeof subValue === 'object' ? subValue.props.children.toString() : subValue.toString();
                return subValueText.toLowerCase().includes(filterText.toLowerCase());
            });
        });

        const matchesSearch = value.some(subValue => {
            if (subValue === null) {
                return false;
            }

            const subValueText = typeof subValue === 'object' ? subValue.props.children.toString() : subValue.toString();
            return subValueText.toLowerCase().includes(search.toLowerCase());
        });

        return matchesFilters && matchesSearch;
    });


    const handleFilterChange = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(selectedFilter => selectedFilter !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const handleSelectAllFilters = () => {
        if (selectedFilters.length === filters.length) {
            setSelectedFilters([]);
        } else {
            setSelectedFilters([...filters]);
        }
    };


    const totalPages = Math.ceil(filteredValues.length / itemsPerPage);

    return (
        <div className="rounded-3 p-4 h-100 bg-dark">
            <div className="mb-2 text-light d-flex align-items-center">
                <h6 className="me-2 h5"> { nameIcon } </h6>
                <h6 className="fw-bold"> { name } </h6>
            </div>
            <div className="d-flex justify-content-between flex-column flex-md-row">
                <div className="col-auto">
                    { startItem }
                </div>
                <div className="col-auto align-items-center row">
                    <div className="input-group input-group-sm">
                        {
                            filters && (
                                <>
                                    <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                                        <ImFilter />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <label className="dropdown-item">
                                                <input
                                                    type="checkbox"
                                                    className="me-2"
                                                    onChange={() => {
                                                        handleSelectAllFilters();
                                                        setPage(0);
                                                    }}
                                                    checked={selectedFilters.length === filters.length}
                                                />
                                                Seleziona tutti
                                            </label>
                                            {
                                                filters && filters
                                                    .map((filter, index) =>
                                                        <label className="dropdown-item" key={ index }>
                                                            <input
                                                                type="checkbox"
                                                                className="me-2"
                                                                onChange={() => {
                                                                    handleFilterChange(filter);
                                                                    setPage(0);
                                                                }}
                                                                checked={selectedFilters.includes(filter)}
                                                            />
                                                            { filter }
                                                        </label>
                                                    )
                                            }
                                        </li>
                                    </ul>
                                </>
                            )
                        }
                        {
                            !searchEnabled && (
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Cerca..."
                                    aria-label="Cerca"
                                    onChange={(event) => {
                                        setSearch(event.target.value.trim());
                                        setPage(0);
                                    }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="table-responsive text-secondary">
                <table className="table table-dark ">
                    <thead>
                    <tr>
                        {
                            headers && headers
                                .map((header, index) =>
                                    <th className="text-light" scope="col" key={ index }> { header } </th>
                                )
                        }
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {filteredValues && filteredValues.length > 0 ? (
                        filteredValues
                            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                            .map((value, index) => (
                                <tr key={index}>
                                    {value.map((subValue, subIndex) => (
                                        <td className="text-light text-nowrap" key={subIndex}>
                                            {subValue}
                                        </td>
                                    ))}
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>Nessun elemento trovato.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            { !paginationEnabled && filteredValues.length > itemsPerPage ?
                <nav>
                    <ul className="pagination pagination-sm justify-content-end mb-1 me-1">

                        <li className={"page-item bg-dark " + (page === 0 ? "disabled" : "")} >
                            <button className="page-link bg-dark" aria-label="Previous" onClick={() => setPage(page - 1)}>
                                <span aria-hidden="true">«</span>
                            </button>
                        </li>

                        <li className="page-item disabled">
                        <span className="page-link">
                            { 1 + page }
                        </span>
                        </li>

                        <li className={"page-item bg-dark " + (page + 1 === totalPages ? "disabled" : "")} >
                            <button className="page-link bg-dark" aria-label="Next" onClick={() => setPage(page + 1)}>

                                <span aria-hidden="true">»</span>
                            </button>
                        </li>

                    </ul>
                </nav>
                : null
            }

        </div>
    );
}

export default Table;