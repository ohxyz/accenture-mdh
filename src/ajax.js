/* Test proxy settings */
/*
fetch( '/api/test' )
    .then( response => response.json() )
    .then( json => {
        console.log( json );
    } );
*/


function getRealTransactions () {

    let url = '/api/getTransactions';

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

    fetch( 
        url,
        
        {
            method: 'POST',
            
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'authorization': 'Basic bWRoUmVzdEFwaUB1c2VyITpza2RpZnc4M3k0Mmtqd2U='
            },
            
            body: postData
        }
        
    ).then( response => {
            
            return response.json();
        
        }
        
    ).then( json => 
    
        {

            let searchRecords = json.SearchRecordSet;
            let records = [];
            
            searchRecords.forEach( record => {
                
                let one = [
                    
                    record[ 'Transaction ID' ],
                    record[ 'Transaction Group' ],
                    record[ 'Created Date' ].slice( 0, 10 ),
                    record[ 'Transaction Type' ],
                    record[ 'Transaction Date' ].slice( 0, 10 )
                ];
                
                records.push( one );

            } );
            
            this.setState( {
                
                rowData: records
                
            } );

        }
    
    ).catch( ex => {
        
        console.log('parsing failed', ex)
        
    } );
}

function fetchTransactions( onfetch, onerror ) {
    
    let url = 'transactions-electricity.json';
        
    fetch( url, {

        method: 'GET',

    
    } ).then( response => {
            
        return response.json();
    
    } ).then( json => {

        onfetch( json ); 

    } ).catch( exception => {
            
        onerror( exception );
        // console.log('parsing failed', exception )
        
    } );
}

module.exports = {
    
    fetchTransactions: fetchTransactions,
    getRealTransactions: getRealTransactions
};
