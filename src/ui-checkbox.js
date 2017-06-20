import React from 'react';

class CheckBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.toggleCheckedValue = this.toggleCheckedValue.bind( this );
        
        this.isChecked = props.isChecked === undefined 
            ? false
            : props.isChecked;
        
        this.className = 'check-box';
        
        this.makeClassName();
        
        this.state = {
            
            isChecked: this.isChecked
        };
        
    }
    
    makeClassName() {

        this.className = this.isChecked === true
            ? 'check-box is-checked'
            : 'check-box';
    }
    
    toggleCheckedValue() {
        
        this.isChecked = !this.isChecked;
        
        this.makeClassName();
        
        this.setState( {
            
           isChecked: this.isChecked
           
        } );
    }
    
    render() {

        return (
        
            <div className={ this.className }
                 id={ this.props.id }
                 data-name={ this.props.name }
                 onClick={ this.toggleCheckedValue }
            >
            { this.props.name }
            </div>
        )
    }
}

export { CheckBox };
