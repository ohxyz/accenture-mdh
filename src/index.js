import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom';

import { Dashboard } from './dashboard';
import { Reports } from './reports';
import './style/index.css';

class AppRouter extends React.Component {

    renderNavLink( linkName ) {
        
        let firstLetterCapitalized = linkName[0].toUpperCase() + linkName.slice( 1 );

        return (
            <NavLink id={ linkName } to={ '/' + linkName } activeClassName="active">
                <span>{ firstLetterCapitalized }</span>
            </NavLink>

        )

    }

    render() {

        return (

            <Router>
                <div>
                    <header>
                        <nav id="top-nav" className="section-box">
                            { this.renderNavLink( 'dashboard' ) }
                            { this.renderNavLink( 'reports' ) }
                        </nav>
                    </header>

                    <Redirect from="/" to="dashboard" />
                    <Route path="/dashboard" component={ Dashboard } />
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


