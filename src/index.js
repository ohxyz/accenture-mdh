import React from 'react';
import ReactDOM from 'react-dom';
import { SearchTransactionsSection } from './search-transactions-section';
import { SearchResultsSection } from './search-results-section';
import 'whatwg-fetch';
import './style/index.css';


class App extends React.Component {
    
    constructor() {
        
        super();
        this.handleSearch = this.handleSearch.bind( this );
        
        this.state = {
            
            showSearchResults: true
        };
        /* Test proxy settings */
        
        fetch( '/api/test' )
            .then( response => response.json() )
            .then( json => {
                
                console.log( json );
            } );
    }
    
    handleSearch( event ) {
        
        console.log( 'search button', event.target );
        
        this.setState( {
            
            showSearchResults: true
            
        } );
    }
    
    renderSearchResultsSection() {
        
        if ( this.state.showSearchResults === true ) {
        
            return (
            
                <section id="search-results-section" >
                    <SearchResultsSection />
                </section>
            
            )
        }
        
        return '';
    }
    
    render() {
        
        return (
            <div id="app">
                <section id="search-transactions-section">
                    <SearchTransactionsSection
                        onSearch={ this.handleSearch }
                    />
                </section>
                { this.renderSearchResultsSection() }
            </div>
        )
    }
}

ReactDOM.render(

    <App />,
    document.getElementById( 'root' )

);


