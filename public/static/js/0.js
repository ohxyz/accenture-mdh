/* All client side code */


var initScrollBar = function ( dropdownBoxElement ) {



};

var initPerfectScrollbar = function () {
    
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

    var scrollbarContainers = document.querySelectorAll( '.dropdown-list' );
    
    scrollbarContainers.forEach( function ( scrollbarContainer ) {
        
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

    } );
                
    /* START: For dynamically generated DropdownBox */

    var isScrollBarInitialized = false;
    
    $( 'body' ).on( 'click', '.dropdown-box', function ( event ) {
        
        var scrollbarContainer = $( '.dropdown-list', this ).get( 0 );
        var $elem = $( this );

        if ( isScrollBarInitialized === false ) {

            Ps.initialize( scrollbarContainer, {
            
                suppressScrollX: true
                
            } );
            
            addInnerBar( scrollbarContainer );
            asyncUpdateScrollBar( scrollbarContainer );
            
            isScrollBarInitialized = true;
        }
        

    } );
    
    /* END: For dynamic generated DropdownBox */ 
};


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
    
};

$( document  ).ready ( function () {
    
    initPikaday();
    initPerfectScrollbar();

} );


