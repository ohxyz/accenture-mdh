import React from 'react';
import { SearchTransactionsSection } from './search-transactions-section';
import { SearchResultsSection } from './search-results-section';
import 'whatwg-fetch';

const AJAX = require( './ajax' );

class DashBoard extends React.Component {
    
    constructor() {
        
        super();

        this.state = {
            
            showSearchResults: true,
            searchResults: []
        };
        
        this.handleSearch = this.handleSearch.bind( this );
        this.handleFetch = this.handleFetch.bind( this );
        
        this.fetchTransactions();
    }
    
    handleFetch( json ) {
        
        let searchRecords = json.SearchRecordSet;
        let records = [];
        // console.log( 'rs', searchRecords );
        
        searchRecords.forEach( record => {

            let one = {
                'Transaction ID': record[ 'Transaction ID'],
                'Transaction Group': record[ 'Transaction Group' ],
                'Date Created': record[ 'Created Date' ].slice( 0, 10 ),
                'Transaction Status': record[ 'Transaction Status' ],
                'Transaction Date': record[ 'Transaction Date' ].slice( 0, 10 )
            };
            
            records.push( one );

        } );
        
        this.setState( {
            
            searchResults: records
        } );
        
    }
    
    handleFetchError( exception ) {
        
        console.log( 'Fetch transations error:', exception );
        
    }
    
    fetchTransactions() {

        AJAX.fetchTransactions( this.handleFetch, this.handleFetchError );
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
            <div id="dashboard">
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

export { DashBoard };