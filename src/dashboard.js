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
        this.handleChange = this.handleChange.bind( this );
        
        this.searchInputs = {
            
            'fuel-type': [ 'Gas' ],
            'nmi-mirn': '',
            'transaction-id': '',
            'message-id': '',
            'transaction-group': [ 'SORD', 'CATS' ],
            'transaction-type': [ 'ServiceOrderRequest', 'CATSObjectionWithdrawal' ],
            'transaction-status': [ 'Completed', 'PACN' ],
            
            'sending-participant': '',
            'receiving-participant': '',
            'unsolicited-responses': false,
            'date-created-from': '',
            'date-created-to': '',
            'time-created-from': '',
            'time-created-to': '',
            'service-order-type': [],
            'service-order-subtype': [],
            'service-order-number': [],
            'cr-code': '',
        };
        
        this.fetchTransactions();
    }
    
    handleFetch( json ) {
        
        let searchRecords = json.SearchRecordSet;
        let records = [];

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
        
        console.log( 'on search', this.searchInputs );
        this.fetchTransactions();
    }
    
    handleChange( event, dropdownBoxSelectedItems ) {
        
        let target = event.target;
        let targetClassName = target.className;
        
        if ( targetClassName.indexOf( 'text-box' ) > -1 ) {
            
            let searchObjectPropertyName = target.name;
            let value = target.value;

            this.searchInputs[ searchObjectPropertyName ] = value;
        }
        else if ( targetClassName.indexOf( 'dropdown-list-item' ) > -1 ) {
            
            this.handleDropdownBoxChange( event, dropdownBoxSelectedItems );
        }
        
        // console.log( 'search inputs', this.searchInputs );
    }
    
    handleDropdownBoxChange( event, selectedItems ) {
        // console.log( selectedItems );
        
        let target = event.target;
        let dropdownBoxElement = target.parentElement.parentElement;    
        let searchObjectPropertyName = dropdownBoxElement.id;

        this.searchInputs[ searchObjectPropertyName ] = selectedItems;
        
    }
    
    renderSearchResultsSection() {

        if ( this.state.showSearchResults === true ) {
        
            return (
            
                <section id="search-results-section" >
                    <SearchResultsSection 
                        searchResults={ this.state.searchResults }
                    />
                </section>
            );
        }
        
        return '';
    }

    render() {
       
        return (
            <div id="dashboard">
                <section id="search-transactions-section">
                    <SearchTransactionsSection
                        defaultInputValues={ this.searchInputs }
                        onSearch={ this.handleSearch }
                        onChange={ this.handleChange }
                    />
                </section>
                { this.renderSearchResultsSection() }
            </div>
        )
    }
}

export { DashBoard };