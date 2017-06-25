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
            
            var dateBoxElement = document.getElementById( id );
            var inputElement = dateBoxElement.querySelector( 'input' );
            var datepickContentElem = dateBoxElement.querySelector( '.date-box-content' );
            
            var $datepickHeader = $( '.date-box-header', dateBoxElement );
            var $inputBox = $( inputElement );

            var onSelect = function ( ) {
                
                // The click event is defined in React
                $datepickHeader.click();
                
                COMPONENTS.dateBoxes[0].handleInputBoxChange();
            };
            
        
            new Pikaday( {
                
                keyboardInput:false,
                field: inputElement,
                format: 'YYYY-MM-DD', 
                firstDay: 1,
                i18n: i18n,
                bound: false,
                container: datepickContentElem,
                onSelect: onSelect
                
            } );
        
        } );
        
    }
    
    var initPerfectScrollbar = function () {
        
        var containers = document.querySelectorAll( '.dropdown-list' );
        
        
        containers.forEach( function ( container ) {
            
            Ps.initialize( container, {
                
               suppressScrollX: true
                
            } );
            
            var $scrollBarY = $( '.ps__scrollbar-y', container );
            var $innerBar = $( '<div class="inner-bar-of-scrollbar">' );
            var $container = $( container );

            $scrollBarY.append( $innerBar );
            
            var $dropdownBox = $container.parent().parent();
            var $dropdownHeader = $dropdownBox.find( '.dropdown-header' );
            
            $dropdownHeader.click( function () {
                
                // NOTE: If it has "is-opened" class, that means the dropdown list is opened
                //       So, the click event will close the dropdown-list
                if ( $dropdownBox.hasClass( 'is-opened' ) === false ) {
                    
                    window.setTimeout( function() {
                        
                        Ps.update( container );
                    }, 0);
                }
            } );

        } );
    }

    initPikaday();
    initPerfectScrollbar();
    
} );


