import React from "react"

export default function ContentWrapper(children) {
    const location = useLocation();
    const isMapPage = location.pathname.includes('/map');

    return (
        <div className={`content-wrapper ${isMapPage ? 'no-padding' : ''}`}>
            {children}
        </div>
    );

};


