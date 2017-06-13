chai.use( chaiHttp );

const serverAddress = 'http://localhost:3000';

function sortArrayByObjectKey( array, objectKey ) {

    let sorted = array.sort( ( a, b ) => {
        
        //return a[ objectKey ] > b[ objectKey ]
        return a[ objectKey ].localeCompare( b[ objectKey ] );
    } );
    
    return sorted;
}

function isNumber( obj ) {
    
    if ( isNaN( obj ) === true ) {
        
        return false;
    }
    
    return true;
}

chai.request( serverAddress )
    .get( '/transactions-gas.json' )
    .then( response => {

        let records = response.body.SearchRecordSet.slice(0, 30);
        console.log( records );
        
        let sorted = sortArrayByObjectKey( records, 'Transaction Date');
        
        sorted.forEach( ( item ) => {
            
            console.log( 'sorted', item[ 'Transaction Date' ] );
            
        })
        
    } )
    .catch( error => {
        
        throw error;
        
    } );
