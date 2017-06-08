import React from 'react'

const UTILS = require( './utils.js' );

class DropdownListItem extends React.Component {

    renderMarkIcon() {
        
        if ( this.props.type === 'single' ) {
            
            return ;
        }
        
        return (
        
            <svg className="svg-selected-icon" viewBox="0 0 34 36.5" width="25" height="25">
                <path d="M24.9,10.5c-0.8-0.5-1.9-0.2-2.3,0.6l-7.4,11.1l-4.1-3.4c-0.7-0.6-1.7-0.6-2.4,0c-0.7,0.6-0.7,1.6,0,2.3
                    l5.6,4.8c0.7,0.6,1.7,0.6,2.4,0c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0,0l8.5-12.7C26,11.9,25.7,10.9,24.9,10.5z"/>
            </svg>
        );
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

        this.itemsSelected = this.props.itemsSelected === undefined
            ? []
            : this.props.itemsSelected
            
        this.type = this.props.type === undefined
            ? 'single'
            : this.props.type;

        // console.log( this.props.id, this.type );
        this.state = {
            
            isOpenedClass: '',
            itemsSelected: this.itemsSelected
        };
        
        this.handleClick = this.handleClick.bind( this );
        this.handleItemSelected = this.handleItemSelected.bind( this );
        this.closeDropdownList = this.closeDropdownList.bind( this );
        this.handleDone = this.handleDone.bind( this );
        
                
        this.dom = null;
        DropdownBox.dropdownBoxes.push( this );
    }
    
    syncSelectedWithListed() {
        
        if ( this.itemsSelected.length > 0 ) {
            
            this.itemsSelected 
                = UTILS.intersectArrays( this.itemsSelected, this.props.listItems );
            
        }
    }

    handleClick() {
        
        if ( this.state.isOpenedClass === 'is-opened' ) {
            
            this.handleDone();
        }
        else {
            
            this.setState( {
            
                isOpenedClass: 'is-opened'
            
            } );
        }
    }
    
    handleItemSelected( event ) {

        if ( this.props.onSelect !== undefined ) {
            
            this.props.onSelect( event );
        }

        if ( this.type === 'basic' ) {

            this.handleItemSelectedBasic( event );
        }
        else if ( this.type === 'single' ) {
            
            this.handleItemSelectedSingle( event );
        }
        else if ( this.type === 'multiple' ) {
            
            this.handleItemSelectedMultiple( event );
        }
        
    }
    
    handleItemSelectedBasic( event ) {
        
        this.itemsSelected[ 0 ] = event.target.textContent;
        
        
        this.setState( {
            
            isOpenedClass: '',
            
        } );
    }
    
    handleItemSelectedSingle( event ) {
        
        this.itemsSelected[ 0 ] = event.target.textContent;

        this.setState( {
            
            isOpenedClass: '',
            
        } );
    }
    
    handleItemSelectedMultiple( event ) {
        
        let item = event.target.textContent;
        UTILS.toggleArrayItem( item, this.itemsSelected );
        
        this.setState( {
            itemsSelected: this.itemsSelected

        } );
        
    }
    
    closeDropdownList( ) {
        
        this.setState( {
            
            isOpenedClass: ''
        } );
    }
    
    handleDone() {
        
        this.closeDropdownList();
    }
    
        
    makeSelectedClassName() {
        
        if ( this.itemsSelected.length === 0 ) {
            
            return '';
        }
        
        if (  this.type === 'basic' ) {
            
            return 'is-selected-basic';
        }
        else if ( this.type === 'single' || this.type === 'multiple' ) {
            
            return 'is-selected';
        }
        
        return '';
    }
    
    makeSelectedLiteralHeader() {
        
        let numOfSelected = this.itemsSelected.length;
        let selectedLiteralHeader = '';
        
        if ( this.type === 'single' || this.type === 'basic' ) {
            
            selectedLiteralHeader = this.itemsSelected[ 0 ];
        }
        else if ( this.type === 'multiple' ) {
            
            selectedLiteralHeader = numOfSelected > 0
                ? numOfSelected + ' selected'
                : '';
        }
        
        
        return selectedLiteralHeader;
    }
    
    renderDropdownBoxHeader() {

        return (
        
            <div className="dropdown-header" onClick={ this.handleClick } >
                <div className="dropdown-icon">
                    { this.renderDropdownIcon() }
                </div>
                <div className="dropdown-name">{ this.props.name }</div>
                <div className="dropdown-selected">
                    { this.makeSelectedLiteralHeader() }
                </div>
            </div>
        )
    }
    
    renderDropdownList() {
        
        return (
            
            <ul className="dropdown-list">
                { 
                    this.props.listItems.map( item => {
                        
                        let className = '';
                        
                        if ( this.type === 'multiple' ) {
                        
                            className = this.itemsSelected.indexOf( item ) >= 0
                                ? 'item-selected'
                                : '';
                        }

                        return ( 
                            <DropdownListItem
                                className={ className }
                                key={ item } 
                                item={ item }
                                type={ this.type }
                                onClick={ this.handleItemSelected }
                            />
                        );
                        
                    } )
                }
                { this.renderDropdownListFooter() }
            </ul>
        )
    }
    
    renderDropdownListFooter() {
        
        if ( this.type === 'single' || this.type === 'basic' ) {
            
            return '';
        }
            
        let numOfSelected = this.itemsSelected.length;
        
        let selectedLiteral = numOfSelected > 1
            ? numOfSelected + ' items selected'
            : numOfSelected + ' item selected';
        
        return (
            <li className="dropdown-list-footer">
                <span className="num-of-selected">{ selectedLiteral }</span>
                <span className="done" onClick={ this.handleDone }>Done</span>
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
        
        this.syncSelectedWithListed();

        let otherClassNames = this.props.otherClassNames === undefined
            ? ''
            : this.props.otherClassNames
        
        return (
        
            <div id={ this.props.id } 
                 className={ 
                    'dropdown-box '
                    + otherClassNames + ' '
                    + this.state.isOpenedClass + ' '
                    + this.makeSelectedClassName()
                }
                ref={ self => this.dom = self }
            >   
                { this.renderDropdownBoxHeader() }
                { this.renderDropdownList() }
            </div>
        );
    }
}

class DropdownBoxGroup extends React.Component {
    
    constructor( props ) {
        
        super();
        
        this.full = props.data;
        
        let full = this.full;
        let firstTierKeys = Object.keys( full );
        
        /*
        let secondTierObjects = UTILS.getMappedObjects( firstTierKeys, full );
        let secondTierKeys = Object.keys( secondTierObjects );
        let thirdTierObjects = UTILS.getMappedObjects( secondTierKeys, secondTierObjects );
        let thirdTierKeys = Object.keys( thirdTierObjects );
        */
        this.state = {
            
            data: [
                firstTierKeys,
                [],
                []
                /*
                secondTierKeys,
                thirdTierKeys
                */
            ]
        };
        
        let numOfDropdownBox = this.state.data.length;
        
        this.itemsSelected = [];
        
        for ( let i = 0; i < numOfDropdownBox; i ++ ) {
            
            this.itemsSelected.push( [] );
        }

        this.handleSelect = this.handleSelect.bind( this );
    }
    
    handleSelect( event, dropdownBoxIndex ) {
        
        let selected = event.target.textContent;
        let itemsPopulated = UTILS.JSONCopy( this.state.data );

        if ( dropdownBoxIndex === 0 ) {

            UTILS.toggleArrayItem( selected, this.itemsSelected[ 0 ] );

            let secondTierKeys = UTILS.getMappedKeys( this.itemsSelected[ 0 ], this.full );
            
            itemsPopulated[ 1 ] = secondTierKeys;
            
            this.setState( { 
            
                data: itemsPopulated
            } );

        }
        
        else if ( dropdownBoxIndex === 1 ) {
            
            let secondTierObjects
                =  UTILS.getMappedObjects( this.itemsSelected[ 0 ], this.full );
                
            UTILS.toggleArrayItem( selected, this.itemsSelected[ 1 ] );
            
            let thirdTierKeys = UTILS.getMappedKeys( this.itemsSelected[ 1 ], secondTierObjects );
            
            itemsPopulated[ 2 ] = thirdTierKeys;
            
            this.setState( {
                
                data: itemsPopulated
            
            });
        }
        
    }
    
    renderDropdownBox( attr, index ) {
        
        return (
            <li key={ attr.id } >
                <DropdownBox
                    type={ attr.type }
                    id={ attr.id }
                    name={ attr.name }
                    listItems={ this.state.data[ index ] }
                    onSelect={ ( event ) => this.handleSelect( event, index ) }
                />
            </li>
        );
    }

    render() {
                
        const transactionStatus = [
            'Completed',
            'Requested',
            'Cancelled',
            'Objected',
            'Pending Acknowledgement',
            'PACN',
            'Rejected'
        ];
         
         /* Rendered for demo purpose only */
        return (
            <ul className="control-list clearfix">
                { 
                    this.props.children.map( ( child, index ) => {

                        return this.renderDropdownBox( child, index );
                    } )
                }
                <li>
                    <DropdownBox
                        type="multiple"
                        id="transaction-status"
                        name="Transaction Status"
                        listItems={ transactionStatus }
                    />
                </li>
            </ul>
        )
    }
}

/* Global events */
DropdownBox.dropdownBoxes = [];

document.addEventListener( 'mouseup', ( event ) => {
    
    DropdownBox.dropdownBoxes.forEach( ( box ) => {
        // console.log( 'box', DropdownBox.dropdownBoxes );
        if ( UTILS.isDescendant( event.target, box.dom ) === false ){
            
            box.closeDropdownList();
        }

    } );
} );

export { DropdownBox, DropdownBoxGroup };



