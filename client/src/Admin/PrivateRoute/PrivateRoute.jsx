import { Navigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { LoginContext } from '../../components/app';
import axios from 'axios';
import Cookies from "js-cookie";
export default function PrivateRoute({ children }) {
    const [login, setLogin] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const getUserCookie = () => {
        if (Cookies.get("user")){
            return Cookies.get("user")
        }else{
            return false
        }
      };
    const user  = getUserCookie();
    //function is to see if the user should be allowed into the app with login
    //const { login, setLogin } = useContext(LoginContext)
    if (user == false){
        return <Navigate to="/login" />;
    }else{
        return children;
    }



};

