import React from 'react';
import ReactDOM from 'react-dom';
import { DashBoard } from './dashboard'
import './style/index.css';

class App extends React.Component {
      
    render () {
        
        return (
        
            <DashBoard />
        )
    }
}


ReactDOM.render(

    <App />,
    document.getElementById( 'root' )

);


