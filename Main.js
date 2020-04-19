import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//Load Navbar
import Navbar from "../component/Navbar";
//Load halaman 

import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import Member from "../page/Member";
import Lapangan from "../page/Lapangan";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                {/* load component tiap halaman */}
                
                <Route path="/home">
                    <Navbar />
                    <Home />
                    
                </Route>

                <Route path="/login">
                    <Navbar />
                    <Login />
                    
                </Route>

                <Route path="/register">
                    <Navbar />
                    <Register />
                    
                </Route>

                <Route path="/member">
                    <Navbar />
                    <Member />
                    
                </Route>

                <Route path="/lapangan">
                    <Navbar />
                    <Lapangan />
                    
                </Route>
             
            </Switch>
        );
    }
}
export default Main;