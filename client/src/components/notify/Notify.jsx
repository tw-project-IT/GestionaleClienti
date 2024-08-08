import React, { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorMessages } from "../../utils/errorMessage";

export const Notify = createContext({
    showMessage: () => {}
});

export const NotifyProvider = ({ children }) => {
    const showMessage = (type, message) => {
        if (type === "error") {
            toast.error(errorMessages[message] || errorMessages['general_error']);
        } else if (type === "success") {
            toast.success(message);
        } else {
            toast(message);
        }
    };

    return (
        <Notify.Provider value={{ showMessage }}>
            {children}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </Notify.Provider>
    );
};