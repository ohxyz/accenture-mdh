import React from 'react'

export class TextBox extends React.Component {
    
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
        
            <div className="text-box">
                <input type="text"
                       size="1"
                       id={ this.props.id } 
                       name={ this.props.name }
                       defaultValue={ this.props.value }
                       onFocus={ this.handleFocus }
                       onBlur={ this.handleBlur }
                
                />
            </div>
        );
    }

}

class DropdownListItem extends React.Component {
    
    render() {
        
        return (
        
            <li onClick={ this.props.onClick } >{ this.props.item }</li>
        );
    } 
}

export class DropdownBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.state = {
            
            isOpenedClass: '',
            selected: this.props.value
        }

        this.listItems = [ 'One', 'Two', 'Three' ];
        this.handleClick = this.handleClick.bind( this );
        this.handleItemSelected = this.handleItemSelected.bind( this );
    }
    
    
    handleClick() {

        if ( this.state.isOpenedClass === 'is-opened' ) {

            this.setState( {
            
                isOpenedClass: ''
            
            } );
        }
        else {
            
            this.setState( {
            
                isOpenedClass: 'is-opened'
            
            } );
        }
    }
    
    handleItemSelected( event ) {
        
        this.setState( {
            
            selected: event.target.innerHTML,
            isOpenedClass: ''
            
        } );
    }
    
    
    render() {
        return (
        
            <div id={ this.props.id } className={ 'dropdown-box ' + this.state.isOpenedClass }>
                <div className="dropdown-selected"
                     onClick={ this.handleClick }
                >
                    { this.state.selected }
                </div>
                <ul className="dropdown-list">
                { 
                    this.listItems.map( item => 
                        
                        <DropdownListItem 
                            key={ item } 
                            item={ item } 
                            onClick={ this.handleItemSelected } /> 
                   ) 
                }
                </ul>
            </div>
        );
    }
}