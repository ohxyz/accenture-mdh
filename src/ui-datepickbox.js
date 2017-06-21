import React from 'react';

const UTILS = require( './utils.js' );

class DatepickBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.toggleCalendar = this.toggleCalendar.bind( this );
        this.handleInputBoxChange = this.handleInputBoxChange.bind( this );
        this.handleInputBoxFocus = this.handleInputBoxFocus.bind( this );
        
        this.inputBox = null;
        
        this.datePicked = props.value === undefined
            ? ''
            : props.value;
        
        this.title = props.title === undefined
            ? ''
            : props.title;
            
        this.showCalendar = false;
        this.datepickBoxClassName = '';
        
        this.setDatepickBoxClassName();
        
        this.dom = null;
        this.name = props.name === undefined
            ? ''
            : props.name;

        DatepickBox.boxes.push( this );
        
        this.state = {
            
            datePicked: this.datePicked,
            showCalendar: this.showCalendar
        };

    }
    
    isDatePicked() {
        
        if ( this.datePicked === '' ) {
            
            return false;
        }
        
        return true;
    }
        
    setDatepickBoxClassName() {
        
        this.datepickBoxClassName = 'datepick-box';
        
        if ( this.isDatePicked() === true ) {
            
            this.datepickBoxClassName += ' is-picked';
        }
        
        if ( this.showCalendar === true ) {
            
            this.datepickBoxClassName += ' is-opened';
            
        }
        
    }
    
    toggleCalendar( event ) {
        
        if ( event.target === this.inputBox ) {
            
            return;
        }
        
        this.showCalendar = !this.showCalendar;
        this.datePicked = this.inputBox.value;
        this.setDatepickBoxClassName();
        
        this.setState( {
            
            showCalendar: this.showCalendar
            
        } );
        
    }
    
    close() {
        
        this.showCalendar = false;
        this.setDatepickBoxClassName();
        
        this.setState( {
            
            showCalendar: false
        } );
    }

    handleInputBoxChange( ) {
        console.log( 'changed' );
        
        // let target = this.inputBox;
        this.datePicked = this.inputBox.value;
        
        this.setDatepickBoxClassName();
        
        if ( this.props.onChange !== undefined ) {
            
            this.props.onChange( this.inputBox, { 
            
                name: this.props.name,
                value: this.datePicked
                
            } );
                
        }
        
        this.setState( {
            
            datePicked: this.datePicked
            
        } ); 
        
    }
    
    handleInputBoxFocus( event ) {
        
        let target = event.target;
        let value = target.value;
        
        this.datePicked = value;

        // console.log( 'focus', value );
    }
    
    renderCalendarIcon() {
        
        return (
        
            <svg className="svg-calendar-icon" viewBox="0 0 34 36.5" width="27" height="27">
                <path d="M24.3,29.9H9.7c-2,0-3.6-1.6-3.6-3.6V13.1c0-1.6,1.1-3,2.6-3.5V11c0,1.6,1.3,2.9,2.9,2.9h0.7
                    c1.6,0,2.9-1.3,2.9-2.9V9.5h3.6V11c0,1.6,1.3,2.9,2.9,2.9h0.7c1.6,0,2.9-1.3,2.9-2.9V9.7c1.5,0.5,2.6,1.8,2.6,3.5v13.1
                    C27.9,28.3,26.3,29.9,24.3,29.9z M24.7,17.2H9.3v7.3c0,1.2,1,2.2,2.2,2.2h10.9c1.2,0,2.2-1,2.2-2.2V17.2z M22.1,12.4
                    c-1,0-1.8-0.8-1.8-1.8V8.4c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8v2.2C23.9,11.6,23.1,12.4,22.1,12.4z M11.9,12.4
                    c-1,0-1.8-0.8-1.8-1.8V8.4c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8v2.2C13.7,11.6,12.9,12.4,11.9,12.4z"/>
            </svg>
        
        );
    }

    render () {
        
        return (
        
            <div id={ this.props.id } 
                 className={ this.datepickBoxClassName }
                 ref={ self => this.dom = self }
            >
                
                <div className="datepick-header"
                     onClick={ this.toggleCalendar }
                >
                    { this.renderCalendarIcon() }
                    <div className="datepick-title">
                        { this.props.title }
                    </div>
                    <input id={ this.props.id + '-input-box' }
                       className="datepick-picked"
                       type="text"
                       value={ this.datePicked }
                       name={ this.props.name }
                       onChange={ this.handleInputBoxChange }
                       onFocus={ this.handleInputBoxFocus }
                       ref={ self => this.inputBox = self }
                    />
                </div>
                <div className="datepick-content" >
                </div>
            </div>
        );
    }
    
    componentDidUpdate() {
        
        if ( this.showCalendar === true ) {

            this.inputBox.focus();
        }
    }
}

DatepickBox.boxes = [];

document.addEventListener( 'mouseup', ( event ) => {
    
    DatepickBox.boxes.forEach( ( box ) => {

        if ( UTILS.isDescendant( event.target, box.dom ) === false ){
            
            box.close();
        }

    } );
    
} );

document.addEventListener( 'DOMContentLoaded' , () => {
    
    window[ 'COMPONENTS' ] = window[ 'COMPONENTS' ] === undefined
        ? {}
        : window[ 'COMPONENTS' ];

    window[ 'COMPONENTS' ].datepickBoxes = DatepickBox.boxes;
    
} );


export { DatepickBox };