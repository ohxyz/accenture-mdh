/* All client side code */

$( '#search-transactions-section' ).ready ( function () {
    
    var initPikaday = function () {

        var elemIds = [
        
            'date-created-from', 
            'date-created-to'
        ];
        
        var containerClassName = 'dropdown-box-content';
        
        var i18n = {
            
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : [ 'January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December' ],
            weekdays      : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                              'Thursday', 'Friday', 'Saturday' ],
            weekdaysShort : [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]
        };
        
        elemIds.forEach( function ( id ) {
            
            var datepickBoxElem = document.getElementById( id );
            var inputElem = datepickBoxElem.querySelector( 'input' );
            var datepickContentElem = datepickBoxElem.querySelector( '.datepick-content' );
            
            var $datepickHeader = $( '.datepick-header', datepickBoxElem );
            var $inputBox = $( inputElem );
            
            // console.log( $datepickHeader );

            var onSelect = function ( ) {
                
                // The click event is defined in React
                $datepickHeader.click();
                console.log( $inputBox );
                
                // $inputBox.prop( 'value', 0 );
                // $inputBox.click();
                console.log( COMPONENTS );
                COMPONENTS.datepickBoxes[0].handleInputBoxChange();
            };
            
        
            new Pikaday( {
                
                field: inputElem,
                
                format: 'YYYY-MM-DD',
                
                firstDay: 1,
                
                i18n: i18n,
                
                bound: false,
                
                container: datepickContentElem,
                
                onSelect: onSelect
            
            } );
        
        } );
        
    }
    
    var initScrollBar = function () {
        
        var $dropdownLists = $( '.dropdown-list' );
        
        $dropdownLists.addClass( 'scrollbar-inner' ).scrollbar();

    };

    initPikaday();
    initScrollBar();
    
} );


