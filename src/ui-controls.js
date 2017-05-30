import React from 'react'

function isDescendant( childElem, parentElem ) {
	
	let node = childElem.parentNode;
	while ( node !== null ) {
		
		if ( node === parentElem ) {
			return true;
		}
		
		node = node.parentNode;
	}
	
	return false;
}

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
		
			<input className="text-box" 
				   type="text"
				   id={ this.props.id } 
				   name={ this.props.name }
				   defaultValue={ this.props.value }
				   onFocus={ this.handleFocus }
				   onBlur={ this.handleBlur }
			/>
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
            selected: props.value
        };

        this.listItems = [ 'One', 'Two', 'Three' ];
        this.handleClick = this.handleClick.bind( this );
        this.handleItemSelected = this.handleItemSelected.bind( this );
		
        this.dom = null;
		DropdownBox.dropdownBoxes.push( this );
        
    }
    
    
    handleClick() {
		// console.log( DropdownBox.doms );
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
    
	closeDropdownList( ) {
		
		this.setState( {
			
			isOpenedClass: ''
		} );
	}
	
    render() {

        return (
        
            <div id={ this.props.id } 
				 className={ 'dropdown-box ' + this.state.isOpenedClass } 
                 ref={ self => this.dom = self }
		    >
                
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

/* Global events */
DropdownBox.dropdownBoxes = [];

document.addEventListener( 'mouseup', ( event ) => {
    
	DropdownBox.dropdownBoxes.forEach( ( box ) => {
        
        if ( isDescendant( event.target, box.dom ) === false ){
            
            // box.closeDropdownList();
        }

	} );
} );






