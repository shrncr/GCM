import { Navigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { LoginContext } from '../../components/app';
import axios from 'axios';
export default function PrivateRoute({ children }) {
    const [login, setLogin] = useState();
    useEffect(() => {
      
        axios({
          url: 'http://localhost:8082/admin/auth',
          method: 'GET',
          headers: {
            authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
          },
          catch(error) {
            console.error('error:', error);
            alert('An error occured.')
          }
        }).then((res) => {
          if (res.data){
            console.log(res.data);
            setLogin(true);
          }else{
            setLogin(false);
           // navigate("/login")
          }
        });
      });
    //function is to see if the user should be allowed into the app with login
    //const { login, setLogin } = useContext(LoginContext)
    switch (login) {
        case true:
            return children;
        case false:
            return <Navigate to="/login" />;
    }


};

