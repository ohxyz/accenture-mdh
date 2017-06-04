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
    }
    
    render() {

        return (
            <ul id="search-results-table">
                <TableRow type="header" data={ this.tableHeaderContent } />
                    {   
                        this.props.tableRows.map( ( item, index ) => 
                    
                            <TableRow type="row" key={ index } data={ item } /> 
                        )
                    }
            </ul>
        )
    }
}


class SearchResultsFooter extends React.Component {
    
    render() {
        const rowsPerPage = [ 15, 30, 50 ];
        
        return (
            <div id="search-results-footer">
                <div id="per-page">
                    No. of items per page 
                    <DropdownBox 
                        id="num-per-page" 
                        name={ this.props.numPerPage }
                        listItems={ rowsPerPage }
                    />
                </div>
                <div className="pager">
                    <label className="pager-prev">&lt;</label>
                    <label className="pager-current">
                        { this.props.currentPage + ' of ' + this.props.totalPage }
                    </label>
                    <label className="pager-next">&gt;</label>
                </div>
            </div>
        )
    }
}

export class LatestTransactions extends React.Component {
    
    constructor() {
        
        super();
        
        this.rowContent = [
            '2017/04/06',
            'Transaction Acknowledgement',
            '2016/10/26',
            0,
            'JRE389195'
        ];
        
        let dummy = [];
        let numOfRows = 100;
        
        for ( let i = 0; i < numOfRows; i ++ ) {
            
            let row =  this.rowContent.slice();
            row[ 3 ] = i + 1;
            dummy[ i ] = row;
        }
        
        this.state = {
            
            currentPage: 1,
            numPerPage: 15,
            rowData: dummy
        }
    }
    
    render() {

        let totalPage = Math.ceil( this.state.rowData.length / this.state.numPerPage );

        return (
            <div id="latest-transactions-content" className="section-box">
                <SearchResultsHeader />
                <SearchResultsTable
                    tableRows={ this.state.rowData }
                />
                <SearchResultsFooter
                    className="clearfix"
                    numPerPage={ this.state.numPerPage }
                    currentPage={ this.state.currentPage }
                    totalPage={ totalPage }
                />
            </div>
        );
    }
}


