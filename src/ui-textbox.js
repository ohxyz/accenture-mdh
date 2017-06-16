import React from 'react';

class TextBox extends React.Component {
    
    constructor() {
        
        super();
        this.handleFocus = this.handleFocus.bind( this );
        this.handleBlur = this.handleBlur.bind( this );
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
    
    render() {
        
        return (
        
            <input className="text-box"
                   type="text"
                   id={ this.props.id } 
                   name={ this.props.name }
                   defaultValue={ this.props.value }
                   onFocus={ this.handleFocus }
                   onBlur={ this.handleBlur }
                   onChange={ this.props.onChange }
            />
        );
    }
}

export { TextBox };