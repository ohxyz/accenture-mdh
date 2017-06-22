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
    
    toggleCheckedValue( event ) {

        this.isChecked = !this.isChecked;
        this.makeClassName();
        
        if ( this.props.onClick !== undefined ) {
            
            var attrs = {
                
                name: this.props.name,
                isChecked: this.isChecked
            }
            
            this.props.onClick( event, attrs );
        }

        this.setState( {
            
           isChecked: this.isChecked
           
        } );
    }
    
    renderCheckedIcon() {
        
        return (
        
            <svg className="svg-check-box-icon" viewBox="0 0 16 20" width="20" height="20">
                <path d="M14,13c0,0.542-0.458,1-1,1H3c-0.542,0-1-0.458-1-1V3c0-0.542,0.458-1,1-1h8l2-2H3C1.35,0,0,1.35,0,3v10c0,1.65,1.35,3,3,3   h10c1.65,0,3-1.35,3-3V7l-2,2V13z"/>
                <polygon points="7,8.985 4.508,6.492 2.492,8.508 7,13.016 16.008,4.008 13.992,1.992  "/>
            </svg>
        )
    }
    
    renderUncheckedIcon() {
        
        return (
        
            <svg className="svg-check-box-icon" viewBox="0 0 16 20" width="20" height="20">
                <path d="M13,0H3C1.35,0,0,1.35,0,3v10c0,1.65,1.35,3,3,3h10c1.65,0,3-1.35,3-3V3C16,1.35,14.65,0,13,0z M14,13c0,0.542-0.458,1-1,1  H3c-0.542,0-1-0.458-1-1V3c0-0.542,0.458-1,1-1h10c0.542,0,1,0.458,1,1V13z"/>
            </svg>
        )
    }
    
    renderCheckBoxIcon() {
        
        if ( this.isChecked === true ) {
            
            return this.renderCheckedIcon();
        }
        
        return this.renderUncheckedIcon();
    }
    
    render() {
    
        return (
        
            <div className={ this.className }
                 id={ this.props.id }
                 data-name={ this.props.name }
                 onClick={ this.toggleCheckedValue }
            >
            { this.renderCheckBoxIcon() }
            { this.props.title }
            </div>
        )
    }
}

export { CheckBox };
