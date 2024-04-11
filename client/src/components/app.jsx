import React, { createContext, useState } from 'react';
import Navbar from './header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Home from './home';
import PlayStylesPage from './playstyles';
import PlayInfo from './playInfo';
import PlayPlaces from './playPlaces';
//import Map from '../Admin/pages/Map'
import Map from './mapx';
import Editor from './Editor'
import Exhbits from "./exhibits"
import Login from "./login"
import SingleInfo from './showzillowboxdeets';
import AdminApp from '../Admin/AdminApp';
import SetData from '../Admin/SetData';
import AdminRoutes from '../Admin/AdminRoutes';
import Resources from './Resources';
import PrivateRoute from '../Admin/PrivateRoute/PrivateRoute';
const LoginContext = createContext();
// <Route path="/exhibits/:id" element={<SingleInfo />}/>
// <Route path="/playstyles/:id" element={<SingleInfo />}/>
// <Route path="/playPlaces/:id" element={<SingleInfo />}/>
function App() {
    const [login, setLogin] = useState(false)
    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            <Router>
                <div>


                    <Routes> {/* Wrap your routes with Routes */}
                        <Route exact path="/" element={<Home />} /> {/* Define route for Home component */}
                        <Route path="/playstyles" element={<PlayStylesPage />} />
                        <Route path="/playInfo" element={<PlayInfo />} />
                        <Route path="/playPlaces" element={<PlayPlaces />} />
                        <Route path="/edit" element={<Editor />} />
                        <Route path="/exhibits" element={<Exhbits />} />
                        <Route path="/:dest/:id" element={<SingleInfo />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/*" element={<PrivateRoute><AdminApp /></PrivateRoute>} />
                        <Route path="/resources/*" element={<Resources />} />
                        <Route path="/map" element={<Map />} />



                    </Routes>
                </div>
            </Router>
        </LoginContext.Provider>

    );
}
export { LoginContext };
export default App;
