import React from "react"
import Navbar from './header';
import UserRoutes from "./UserRoutes";

export default function UserApp(props) {
    return (
        <div>
            <Navbar />
            <UserRoutes />

        </div>
    )
};

