import { Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LoginContext } from '../../components/app';
export default function PrivateRoute({ children }) {
    //function is to see if the user should be allowed into the app
    const { login, setLogin } = useContext(LoginContext)
    switch (login) {
        case true:
            return children;
        case false:
            return <Navigate to="/login" />;
    }


};

