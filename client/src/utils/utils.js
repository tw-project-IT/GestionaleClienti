import { removeCookie } from "./cookie";
import {FiAlertTriangle} from "react-icons/fi";

export const redirect = (path) => {
    window.location.pathname = path;
    return null;
}

export const redirectLogin = () => redirect("/login");

function getBackgroundColor(lastMaintenanceDate) {
    if (!lastMaintenanceDate) return "";

    const today = new Date();
    const lastDate = new Date(lastMaintenanceDate);

    const daysPassed = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (daysPassed < 365) return "";
    if (daysPassed < 730) return "yellow";
    return "red";
}

export function getMaintenanceText(boiler) {
    return <span style={{
        backgroundColor: getBackgroundColor(boiler.last_maintenance_date),
        color: getBackgroundColor(boiler.last_maintenance_date) === "" ? "white" : "black"
    }}>
            { boiler.last_maintenance_date ?
                (<>
                    { new Date(boiler.last_maintenance_date).toLocaleDateString() + " " }
                    { boiler.notes && (
                        <>
                            <FiAlertTriangle size="23" />
                            { " " + boiler.notes}
                        </>
                    )}
                </>) : "Nessuna"
            } </span>
}