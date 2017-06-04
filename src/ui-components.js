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

function toggleArrayItem( item, array ){
	
	let index = array.indexOf( item );
	
	if ( index === -1 ) {
		
		array.push( item );
	}
	else {
		
		array.splice( index, 1 );
	}
	
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

    renderMarkIcon() {
        
        return (
        
            <svg className="svg-selected-icon" viewBox="0 0 34 36.5" width="25" height="25">
                <path d="M24.9,10.5c-0.8-0.5-1.9-0.2-2.3,0.6l-7.4,11.1l-4.1-3.4c-0.7-0.6-1.7-0.6-2.4,0c-0.7,0.6-0.7,1.6,0,2.3
                    l5.6,4.8c0.7,0.6,1.7,0.6,2.4,0c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0,0l8.5-12.7C26,11.9,25.7,10.9,24.9,10.5z"/>
            </svg>
        )
    }
    
    render() {
        
        return (
        
            <li className={ this.props.className }
					onClick={ this.props.onClick } 
			>
                { this.renderMarkIcon() }
                { this.props.item }
			</li>
        );
    } 
}

class DropdownBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
		
        this.state = {
            
            isOpenedClass: '',
			isSelectedClass: '',
            selectedLiteralHeader: null,
			itemsSelected: []
        };

        this.handleClick = this.handleClick.bind( this );
        this.handleItemSelected = this.handleItemSelected.bind( this );
		this.closeDropdownList = this.closeDropdownList.bind( this );
        
        this.dom = null;
		DropdownBox.dropdownBoxes.push( this );
		
		this.itemsSelected = [];
        
    }
	
	isSingleDropdownBox() {
		
		return ( this.props.type === 'single' || this.props.type === undefined )
			? true
			: false;
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
        
        if ( this.props.type === undefined
                || this.props.type === 'basic' ) {
            
            this.handleItemSelectedBasic( event );
                
        }
		else if ( this.props.type === 'single' ) {
			
			this.handleItemSelectedSingle( event );
		}
		else if ( this.props.type === 'multiple' ) {
			
			this.handleItemSelectedMultiple( event );
		}
        
    }
    
    handleItemSelectedBasic( event ) {
        
        this.setState( {
            
            selectedLiteralHeader: event.target.textContent,
            isOpenedClass: '',
			isSelectedClass: 'is-selected-basic'
            
        } );
    }
    
	
	handleItemSelectedSingle( event ) {
		
		this.setState( {
            
            selectedLiteralHeader: event.target.textContent,
            isOpenedClass: '',
			isSelectedClass: 'is-selected'
            
        } );
	}
	
	handleItemSelectedMultiple( event ) {
        
		let item = event.target.textContent;
		toggleArrayItem( item, this.itemsSelected );

		let numOfSelected = this.itemsSelected.length;

		this.setState( {
			
			selectedLiteralHeader: numOfSelected + ' selected',
			isSelectedClass: 'is-selected',
			itemsSelected: this.itemsSelected

		} );
		
	}
    
	closeDropdownList( ) {
		
		this.setState( {
			
			isOpenedClass: ''
		} );
	}
	
	renderDropdownListFooter() {
		
		if ( this.isSingleDropdownBox() === true ) {
			
			return '';
		}
			
		let numOfSelected = this.itemsSelected.length;
		
		let selectedLiteral = numOfSelected > 1
			? numOfSelected + ' items selected'
			: numOfSelected + ' item selected';
		
		return (
			<li className="dropdown-list-footer">
				<span className="num-of-selected">{ selectedLiteral }</span>
				<span className="done" onClick={ this.closeDropdownList }>Done</span>
			</li>
		)
	}

	renderDropdownIcon() {
        return (
            
            <svg className="svg-dropdown-icon" viewBox="0 0 34 36.5" width="30" height="30">
                <path d="M17,10.6l-5.8,5.8h11.7L17,10.6z M17,25.9l5.9-5.8H11.2L17,25.9z"/>
            </svg>
        
        )
    }
    
    render() {
		console.log( 'li', this.props.listItems );
        return (
        
            <div id={ this.props.id } 
				 className={ 
					'dropdown-box ' 
					+ this.state.isOpenedClass + ' '
					+ this.state.isSelectedClass
				}
                ref={ self => this.dom = self }
		    >   
                <div className="dropdown-header" onClick={ this.handleClick } >
					<div className="dropdown-icon">
                        { this.renderDropdownIcon() }
                    </div>
                    <div className="dropdown-name">{ this.props.name }</div>
                    <div className="dropdown-selected">
                        { this.state.selectedLiteralHeader }
                    </div>
				</div>
                <ul className="dropdown-list">
					{ 
						this.props.listItems.map( item => {
							
                            let className = this.state.itemsSelected.indexOf( item ) >= 0
                                ? 'item-selected'
                                : '';
							
                            return ( 
                                <DropdownListItem
                                    className={ className }
                                    key={ item } 
                                    item={ item } 
                                    onClick={ this.handleItemSelected }
                                />
                            );
                            
                        } )
					}
					{ this.renderDropdownListFooter() }
                </ul>
            </div>
        );
    }
}

class DropdownBoxGroup extends React.Component {
    
}


/* Global events */
DropdownBox.dropdownBoxes = [];

document.addEventListener( 'mouseup', ( event ) => {
    
	DropdownBox.dropdownBoxes.forEach( ( box ) => {
        // console.log( 'box', DropdownBox.dropdownBoxes );
        if ( isDescendant( event.target, box.dom ) === false ){
            
            box.closeDropdownList();
        }

	} );
} );

export { DropdownBox, DropdownBoxGroup };





