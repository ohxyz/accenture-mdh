import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom';

import { DashBoard } from './dashboard';
import { Reports } from './reports';
import './style/index.css';

class AppRouter extends React.Component {

    render() {

        return (

            <Router>
                <div>
                    <header>
                        <nav id="top-nav" className="section-box">
                            <NavLink id="dashboard" to="/dashboard" activeClassName="active">
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink id="reports" to="/reports" activeClassName="active">
                                <span>Reports</span>
                            </NavLink>
                        </nav>
                    </header>

                    <Redirect from="/" to="dashboard" />
                    <Route path="/dashboard" component={ DashBoard } />
                    <Route path="/reports" component={ Reports } />
                </div>
            </Router>
        );
    }
}

class App extends React.Component {
      
    render () {
        
        return (
            <AppRouter />
        )
    }
}


ReactDOM.render(

    <App />,
    document.getElementById( 'root' )

);


