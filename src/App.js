import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {NavBar} from "./components/NavBar";
import {AlertState} from "./Context/alert/AlertState";
import {FirebaseState} from "./Context/firebase/FirebaseState";

function App() {
    return (
        <AlertState>
            <FirebaseState>
                <BrowserRouter>
                    <NavBar/>
                    <div className="container pt-4">
                        <Switch>
                            <Route exact path={'/'} component={Home}/>
                            <Route path={'/about'} component={About}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </FirebaseState>
        </AlertState>
    );
}

export default App;
