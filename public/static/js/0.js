/* All client side code */


var EXTERNAL_SCRIPTS = {

    initScrollbar: function ( scrollbarContainer ) {
        
        function addInnerBar( scrollbarContainer ) {
            
            var $scrollBarY = $( '.ps__scrollbar-y', scrollbarContainer );
            var $innerBar = $( '<div class="inner-bar-of-scrollbar">' );
            $scrollBarY.append( $innerBar );

        };
        
        function asyncUpdateScrollBar( scrollbarContainer ) {
                           
            window.setTimeout( function() {
                
                Ps.update( scrollbarContainer );
            }, 0 );
        }

        Ps.initialize( scrollbarContainer, {
                
            suppressScrollX: true
                
        } );
        
        addInnerBar( scrollbarContainer );
        
        var $scrollbarContainer = $( scrollbarContainer );
        var $dropdownBox = $scrollbarContainer.parent().parent();
        var $dropdownHeader = $dropdownBox.find( '.dropdown-header' );

        $dropdownHeader.click( function () {
            
            // NOTE: If it has "is-opened" class, that means the dropdown list is opened
            //       So, the click event will close the dropdown-list
            if ( $dropdownBox.hasClass( 'is-opened' ) === false ) {

                asyncUpdateScrollBar( scrollbarContainer );
            }
        } );

    },
    
    initPikaday: function ( dateBoxElement, onSelect ) {

        var i18n = {
        
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : [ 'January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December' ],
            weekdays      : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                              'Thursday', 'Friday', 'Saturday' ],
            weekdaysShort : [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]
        };
        
        var inputElement = dateBoxElement.querySelector( 'input' );
        var datepickContentElem = dateBoxElement.querySelector( '.date-box-content' );

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

    }
};


