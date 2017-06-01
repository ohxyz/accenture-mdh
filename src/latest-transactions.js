import React from 'react';
import { DropdownBox } from './ui-components';

class SearchResultsHeader extends React.Component {
    
    render() {
        return (
        
            <div id="search-results-header" className="clearfix">
                <h1 id="search-results-heading">Search Results</h1>
                <h2 id="displaying-heading">Displaying 15 Items</h2>
                <button id="customise">Customise</button>
                <button id="export-all">Export all to CSV</button>
            </div>
        )
    }
}

class TableData extends React.Component {
    
    render() {
        return (
        
            <label>{ this.props.data }</label>
        )
    }
}

class TableRow extends React.Component {
    
    constructor() {
        super();

    }
    
    render() {
        
        let cssClass = '';
        
        if ( this.props.type === 'header' ) {
            cssClass = 'table-header';
        }
        
        return (
            <li className = { cssClass }>
            { 
                this.props.data.map( ( item, index ) => 
                    
                    <TableData key={ index } data={ item } /> 
                ) 
            }
            </li>
        )
    }
}

class SearchResultsTable extends React.Component {
    
    constructor() {
        
        super();
        this.tableHeaderContent = [
            'Created Date',
            'Type',
            'Transaction Date',
            'Transaction ID',
            'DB ID'
        ];
        
        this.rowContent = [
            '2017/04/06',
            'Transaction Acknowledgement',
            '2016/10/26',
            '22',
            'JRE389195'
        ];

    }
    
    render() {
        let dummy = this.dummy = Array( 15 ).fill( this.rowContent )

        return (
            <ul id="search-results-table">
                <TableRow type="header" data={ this.tableHeaderContent } />
                { dummy.map( (item, index) => <TableRow type="row" key={ index } data={ item } /> ) }
            </ul>
        )
    }
}


class SearchResultsFooter extends React.Component {
    
    render() {
        return (
            <div id="search-results-footer">
                <div id="per-page">
                    No. of items per page 
                    <DropdownBox id="num-per-page" value='15'/>
                </div>
            </div>
        )
    }
}

export class LatestTransactions extends React.Component {
    
    render() {
        
        return (
            <div id="latest-transactions-content" className="section-box">
                <SearchResultsHeader />
                <SearchResultsTable />
                <SearchResultsFooter />
            </div>
        );
    }
}


