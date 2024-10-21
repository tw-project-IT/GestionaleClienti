import { removeCookie } from "./cookie";
import {FiAlertTriangle} from "react-icons/fi";

export const redirect = (path) => {
    window.location.pathname = path;
    return null;
}

export const redirectLogin = () => redirect("/login");

export const logout = () => {
    removeCookie('token');
    return redirect("/login");
}

function getBackgroundColor(lastMaintenanceDate) {
    if (!lastMaintenanceDate) return "";

    const yearsPassed = new Date().getFullYear() - new Date(lastMaintenanceDate).getFullYear();

    if (yearsPassed < 1) return "";
    if (yearsPassed < 2) return "yellow";
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