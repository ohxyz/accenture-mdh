import React from 'react';
import 'whatwg-fetch';
import { SearchTransactionsSection } from './search-transactions-section';
import { SearchResultsSection } from './search-results-section';
import { GLOBAL, LOCAL_DATA } from './config';

const AJAX = require( './ajax' );
const UTILS = require( './utils' );

class Dashboard extends React.Component {
    
    constructor() {
        
        super();
        
        this.handleSearch = this.handleSearch.bind( this );
        this.handleFetch = this.handleFetch.bind( this );
        this.handleChange = this.handleChange.bind( this );
        
        this.searchInputs = LOCAL_DATA.defaultSearchInputs;
        
        this.showSearchResults = GLOBAL.showSearchResults;
        this.isSearching = false;
        this.searchResults = [];
        
        if ( this.showSearchResults === true ) {
            
            this.fetchTransactions();
        }
        
        this.state = {
            
            showSearchResults: GLOBAL.showSearchResults,
            isSearching: false

        };

        Dashboard.dashboard = this;
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
        
        this.searchResults = records;
        this.isSearching = false;
        
        this.setState( {

            showSearchResults: true,
            isSearching: false
        } );
        
    }
    
    handleFetchError( exception ) {
        
        console.log( 'Fetch transations error:', exception );
        
    }
    
    fetchTransactions() {

        AJAX.fetchTransactions( this.handleFetch, this.handleFetchError );
    }
    
    handleSearch( event ) {
        
        if ( this.isSearching === true ) {
            return;
        }
        
        this.isSearching = true;
        
        this.setState( {
            
            isSearching: true  
            
        } );
        
        console.log( 'on search', this.searchInputs );
        this.fetchTransactions();
    }
    
    handleChange( eventOrElement, boxAttrs ) {

        let targetElement = eventOrElement.currentTarget === undefined
            ? eventOrElement
            : eventOrElement.currentTarget;

        let targetClassName = targetElement.className;
        
        if ( targetClassName.indexOf( 'text-box' ) > -1 ) {
            
            let searchObjectPropertyName = targetElement.name;
            let value = targetElement.value;

            this.searchInputs[ searchObjectPropertyName ] = value;
            
        }
        else if ( targetClassName.indexOf( 'dropdown-list-item' ) > -1 ) {
            
            let dropdownBoxAttrs = boxAttrs;
            this.searchInputs[ dropdownBoxAttrs.name ] = dropdownBoxAttrs.value;
        }
        else if ( targetClassName.indexOf( 'check-box' ) > -1 ) {
            
            let checkBoxAttrs = boxAttrs;
            this.searchInputs[ checkBoxAttrs.name ] = checkBoxAttrs.isChecked;
        }
        else if ( targetClassName.indexOf( 'date-box-picked' ) > -1 ) {
            
            
            let DateBoxAttrs = boxAttrs;
            this.searchInputs[ DateBoxAttrs.name ] = DateBoxAttrs.value;
        }
        
        // console.log( 'search inputs', this.searchInputs );
    }

    renderSearchResultsSection() {

        if ( this.state.showSearchResults === true ) {
        
            return (
                <section id="search-results-section" >
                    <SearchResultsSection 
                        searchResults={ this.searchResults }
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
                        isSearching={ this.isSearching }
                    />
                </section>
                { this.renderSearchResultsSection() }
            </div>
        )
    }
}


document.addEventListener( 'DOMContentLoaded' , () => {
    
    window[ 'COMPONENTS' ] = UTILS.setDefault( window[ 'COMPONENTS' ], {} );
    window[ 'COMPONENTS' ].dashboard = Dashboard.dashboard;
    
} );

export { Dashboard };