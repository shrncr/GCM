import React from "react"
import Navbar from './header';
import UserRoutes from "./UserRoutes";
import SetData from "../Admin/SetData";

export default function UserApp(props) {
    return (
        <SetData>
            <div>
                <Navbar />
                <UserRoutes />

            </div>
        </SetData>
    )
};

