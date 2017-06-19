/* All client side code */

$( '#search-transactions-section' ).ready ( function () {
    
    var initPikaday = function () {

        var elemIds = [ 'date-created-from', 'date-created-to' ];
        
        var i18n = {
            
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : [ 'January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December' ],
            weekdays      : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                              'Thursday', 'Friday', 'Saturday' ],
            weekdaysShort : [ 'S', 'M', 'T', 'W', 'TH', 'F', 'S' ]
        };
        
        elemIds.map( function ( id ) {
        
            new Pikaday( { 
                
                field: document.getElementById( id ),
                
                format: 'YYYY/MM/DD',
                
                i18n: i18n
            
            } );
        
        } );
        
    }
    
    var initScrollBar = function () {
        
        var $dropdownLists = $( '.dropdown-list' );
        
        $dropdownLists.addClass( 'scrollbar-inner' ).scrollbar();

    }

    initPikaday();  
    initScrollBar();

} );


