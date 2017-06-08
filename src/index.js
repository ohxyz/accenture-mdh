import React from 'react';
import ReactDOM from 'react-dom';
import { SearchTransactionsSection } from './search-transactions-section';
import { SearchResultsSection } from './search-results-section';
import 'whatwg-fetch';
import './style/index.css';


class App extends React.Component {
    
    constructor() {
        
        super();
        
        
        
        this.state = {
            
            showSearchResults: true,
            searchResults: []
        };
        
        this.handleSearch = this.handleSearch.bind( this );
        
        this.fetchTransactions();
    }
    
    fetchTransactions() {

        let url = 'transactions-gas.json';
        
        fetch( url, {

            method: 'GET',

        }  ).then( response => {
                
                return response.json();
            })
            .then( json => {

                let searchRecords = json.SearchRecordSet;
                
                let records = [];
                
                searchRecords.forEach( record => {
                    
                    let one = [
                        
                        record[ 'Transaction ID' ],
                        record[ 'Transaction Group' ],
                        record[ 'Created Date' ].slice( 0, 10 ),
                        record[ 'Transaction Type' ],
                        record[ 'Transaction Date' ].slice( 0, 10 )
                    ]
                    
                    records.push( one );

                } );
                
                this.setState( {
                    
                    searchResults: records
                } );

            } )
            .catch( ex => {
                console.log('parsing failed', ex)
                
            } );
    }
    
    handleSearch( event ) {
        
        this.setState( {
            
            showSearchResults: true
            
        } );
        
        this.fetchTransactions();
    }
    
    renderSearchResultsSection() {
        //console.log('render results', this.state.searchResults)
        if ( this.state.showSearchResults === true ) {
        
            return (
            
                <section id="search-results-section" >
                    <SearchResultsSection 
                        searchResults={ this.state.searchResults }
                    />
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


