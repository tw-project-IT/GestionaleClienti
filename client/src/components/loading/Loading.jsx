import React, { useEffect, useRef, useState } from "react";
import "./style.scss";

export default function Loading({ loaded }) {
    const [render, setRender] = useState(true);
    const loadingRef = useRef(null);

    useEffect(() => {
        if (!loaded) {
            document.body.style.overflowY = "hidden";
            setRender(true);
            return;
        }

        setTimeout(() => {
            document.body.style.overflowY = "auto";

            setTimeout(() => setRender(false), 600);
        }, 600);
    }, [loaded]);

    if (!render) return null;

    return (
        <div className="loading center" ref={ loadingRef }>
            <div className="loader"></div>
        </div>
    )
}