import React from 'react';

class DatePickBox extends React.Component {
    
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
            
        this.showCalendar = true;
        this.datepickBoxClassName = '';
        
        this.setDatepickBoxClassName();
        
        this.state = {
            
            datePicked: this.datePicked,
            showCalendar: this.showCalendar
        };
        
    } 
        
    setDatepickBoxClassName() {
        
        if ( this.showCalendar === true ) {
            
            this.datepickBoxClassName = 'datepick-box is-opened';
        }
        else {
            
            this.datepickBoxClassName = 'datepick-box';
        }
        
    }
    
    toggleCalendar( event ) {
        console.log( 'c', event.target );
        
        this.showCalendar = !this.showCalendar;
        this.setDatepickBoxClassName();
        
        this.datePicked = this.inputBox.value;
        
        this.setState( {
            
            showCalendar: this.showCalendar
            
        } );
        
    }

    handleInputBoxChange( event ) {
        
        let target = event.target;
        let value = target.value;
        
        this.datePicked = value;
        
        this.setState( {
            
            datePicked: this.datePicked
            
        } ); 
        
    }
    
    handleInputBoxFocus( event ) {
        
        let target = event.target;
        let value = target.value;
        
        this.datePicked = value;
        
        // this.toggleCalendar();
        console.log( 'focus', value );
    }

    render () {
        
        return (
        
            <div id={ this.props.id } 
                 className={ this.datepickBoxClassName }
            >
                <div className="datepick-header"
                     onClick={ this.toggleCalendar }
                >
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
                       ref={ input => this.inputBox = input }
                    />
                </div>
                
                <div className="datepick-content" >
                </div>
            </div>
        );
    }
}

export { DatePickBox };