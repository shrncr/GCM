import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom

import AdminApp from '../Admin/AdminApp';
import Login from './login'
import PrivateRoute from '../Admin/PrivateRoute/PrivateRoute';
import UserApp from './UserApp';
const LoginContext = createContext();
// <Route path="/exhibits/:id" element={<SingleInfo />}/>
// <Route path="/playstyles/:id" element={<SingleInfo />}/>
// <Route path="/playPlaces/:id" element={<SingleInfo />}/>
function App() {
    //Creates login context to know if a user has logged in or not
    const [login, setLogin] = useState(false)
    return (
        //context applies to every route
        <LoginContext.Provider value={{ login, setLogin }}>
            <Router>
                <div>
                    <Routes> {/* Wrap your routes with Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<UserApp />} />
                        <Route path="/admin/*" element={<AdminApp />} />
                    </Routes>
                </div>
            </Router>
        </LoginContext.Provider>

    );
}
export { LoginContext };
export default App;
