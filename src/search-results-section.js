import React from 'react';
import { TableBox } from './ui-tablebox';
import 'whatwg-fetch';

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
        let numOfRows = 62;
        
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
                
                /*
                this.setState({
                    
                    rowData: dummy
                    
                } );
                */
            } )
            .catch( ex => {
                console.log('parsing failed', ex)
                
            } );
    }
    
    componentDidMount() {
        
        this.fetchTransactions();
    }
    
    render() {
        
        let tableHeaderContent = [
            'Transaction ID',
            'Transaction Group',
            'Date Created',
            'Transaction Ref No.',
            'Transaction Date'
        ];
        
        
        
        // Use [ '15', '30', '50' ] instead of [ 15, 30, 50 ], 
        // Could be a bug in React or Babel or elsewhere
        return (
            <div id="latest-transactions-content" className="section-box">
                <TableBox
                    columnNames={ tableHeaderContent }
                    rowData={ this.state.rowData } 
                    numberPerPage={ this.state.numPerPage }
                    currentPageNumber={ this.state.currentPage }
                    
                    numberPerPageOptions={ [ '15', '30', '50' ] }
                />
            </div>
        );
    }
}

export { SearchResultsSection };
