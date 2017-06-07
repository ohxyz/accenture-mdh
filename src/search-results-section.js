import React from 'react';
import { DropdownBox } from './ui-components';
import 'whatwg-fetch';

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
            'Transaction ID',
            'Transaction Group',
            'Date Created',
            'Transaction Ref No.',
            'Transaction Date'
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

class SearchResultsSection extends React.Component {

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
        let numOfRows = 60;
        
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
    
    fetchTransactions() {
        
        //let url = '/transactions.json';
        //let url = '/api/getTransactions';
        let url = 'transactions-gas.json';
        
        let fuel = 'MDHGas';
        let postData = { 
            
            Fuel_Type: { 
                
                value: fuel,
                Comment: 'Fuel type is either MDHElec or MDHGas' 
            },
            
            Transaction_Id: '',
            Message_ID: '',
            NMI: '',
            MIRN: '',
            Transaction_Group: '',
            XML_Transaction_Type: '',
            Master_Transaction_Status: '',
            CATS_Sender: '',
            CATS_Receiver: '',
            Date_Created_From: '',
            Date_Created_To: '',
            Service_Order_Type_Id: '',
            Service_Order_Sub_Type_Id: '',
            Service_Order_Number: '',
            CATS_Change_Reason_Code: '',
            Transaction_Date_From: '',
            Transaction_Date_To: '' 
        };
        
        fetch( url, {

            method: 'GET',
            /*
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'authorization': 'Basic bWRoUmVzdEFwaUB1c2VyITpza2RpZnc4M3k0Mmtqd2U='
            },
            */
            body: postData
            
        }  ).then( response => {
                
                return response.json();
            })
            .then( json => {

                let searchRecords = json.SearchRecordSet;
                
                console.log( 'records', searchRecords );
                
                let dummy = [];
                
                searchRecords.forEach( record => {
                    
                    let one = [
                        
                        record[ 'Transaction ID' ],
                        record[ 'Transaction Group' ],
                        record[ 'Created Date' ].slice( 0, 10 ),
                        record[ 'Transaction Type' ],
                        record[ 'Transaction Date' ].slice( 0, 10 )
                    ]
                    
                    dummy.push( one );

                } );
                
               
                this.setState({
                    
                    rowData: dummy
                    
                } );
          
            } )
            .catch( ex => {
                console.log('parsing failed', ex)
                
            } );
    }
    
    componentDidMount() {
        
        this.fetchTransactions();
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

export { SearchResultsSection };
