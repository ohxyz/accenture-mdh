import React from 'react';

class TextBox extends React.Component {
    
    constructor() {
        
        super();
        this.handleFocus = this.handleFocus.bind( this );
        this.handleBlur = this.handleBlur.bind( this );
        this.handleTyping = this.handleTyping.bind( this );
        
        this.className = 'text-box';
    }
    
    handleFocus( event ) {
        
        let input = event.target;
        
        if ( input.value === this.props.value ) {
             input.value = '';
        }
        
    }
    
    handleBlur( event ) {
        
        let input = event.target;
        
        if ( input.value === '' ) {
            input.value = this.props.value;
        }
    }
    
    handleTyping( event ) {
        
        let input = event.target;
        
        if ( input.value === '' || input.value === this.props.value ) {
            
            this.className = 'text-box';
        }
        else {
            
            this.className = 'text-box is-filled';
        }
        
        this.props.onChange( event );
        
        this.setState( {
        
            value: input.value
            
        } );
        
    }
    
    render() {
        
        return (
        
            <input className={ this.className }
                   type="text"
                   id={ this.props.id } 
                   name={ this.props.name }
                   defaultValue={ this.props.value }
                   onFocus={ this.handleFocus }
                   onBlur={ this.handleBlur }
                   onChange={ this.handleTyping }
            />
        );
    }
}

export { TextBox };