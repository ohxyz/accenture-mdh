import React from 'react';

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
        
        this.handleHeaderClick = this.handleHeaderClick.bind( this );
        this.handleItemSelected = this.handleItemSelected.bind( this );
        this.close = this.close.bind( this );
        this.handleDone = this.handleDone.bind( this );
        
        this.itemsSelected = this.props.itemsSelected === undefined
            ? []
            : this.props.itemsSelected
            
        this.type = props.type === undefined
            ? 'single'
            : this.props.type;
        
        this.name = props.name === undefined
            ? ''
            : props.name;
        
        this.dropdownListElement = null;
        
        this.enableDropdownBox = true;


        this.state = {
            
            isOpenedClass: '',
            itemsSelected: this.itemsSelected
        };

        
        this.dom = null;
        this.value = this.itemsSelected;
        
        DropdownBox.boxes.push( this );
    }
    
    syncSelectedWithListed() {
        
        if ( this.itemsSelected.length > 0 ) {
            
            this.itemsSelected 
                = UTILS.intersectArrays( this.itemsSelected, this.props.listItems );
            
        }
    }

    handleHeaderClick() {
            
        if ( this.enableDropdownBox === false ) {
            
            return;
        }
        
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
        
        if ( this.props.onGroupSelect !== undefined ) {
            
            this.props.onGroupSelect( event );
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
    
    close( ) {
        
        this.setState( {
            
            isOpenedClass: ''
        } );
    }
    
    handleDone() {

        this.close();
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
        
            <div className="dropdown-header"
                 onClick={ this.handleHeaderClick } 
            >
                <div className="dropdown-icon">
                    { this.renderDropdownIcon() }
                </div>
                <div className="dropdown-title">{ this.props.title }</div>
                <div className="dropdown-selected">
                    { this.makeSelectedLiteralHeader() }
                </div>
            </div>
        )
    }
    
    isDropdownListEmpty() {
        
        if ( this.props.listItems === undefined 
                || this.props.listItems.length === 0 ) {
            
            return true;
        }
        
        return false;
    }
    
    renderDropdownContent() {
        
        
        let listItems = this.props.listItems;
        
        if ( this.isDropdownListEmpty() ) {
            
            this.enableDropdownBox = false;
            listItems = [];
        }
        else {
            
            this.enableDropdownBox = true;
        }

        return (
            <div className="dropdown-content">
                <ul className="dropdown-list" ref={ elem => this.dropdownListElement = elem }>
                    { 
                        listItems.map( item => {
                            
                            let className = 'dropdown-list-item ';
                            
                            if ( this.type === 'multiple' ) {
                            
                                className += this.itemsSelected.indexOf( item ) >= 0
                                    ? 'item-selected'
                                    : '';
                            }

                            return ( 
                                <DropdownListItem
                                    className={ className }
                                    key={ item } 
                                    item={ item }
                                    type={ this.type }
                                    onClick={ ( event ) => {
                                        
                                        this.handleItemSelected( event );
                                        this.props.onSelect( event, { name: this.name, value: this.itemsSelected } );
                                    } }
                                />
                            );
                            
                        } )
                    }
                </ul>
                { this.renderDropdownContentFooter() }
            </div>
        )
    }
    
    renderDropdownContentFooter() {
        
        if ( this.type === 'single' 
                || this.type === 'basic' ) {
            
            return '';
        }
            
        let numOfSelected = this.itemsSelected.length;
        
        let selectedLiteral = numOfSelected > 1
            ? numOfSelected + ' items selected'
            : numOfSelected + ' item selected';
        
        return (
            <div className="dropdown-content-footer">
                <span className="num-of-selected">{ selectedLiteral }</span>
                <span className="done" onClick={ this.handleDone }>Done</span>
            </div>
        );
    }

    renderDropdownIcon() {
        return (
            
            <svg className="svg-dropdown-icon" viewBox="0 0 34 36.5" width="30" height="30">
                <path d="M17,10.6l-5.8,5.8h11.7L17,10.6z M17,25.9l5.9-5.8H11.2L17,25.9z"/>
            </svg>
        
        );
    }

    render() {
        
        this.syncSelectedWithListed();
        
        let disableDropdownBoxClassName = ''
        
        if ( this.isDropdownListEmpty() === true ) {
            
            this.enableDropdownBox = false;
            disableDropdownBoxClassName = 'dropdown-box-disabled';
        }

        let otherClassNames = this.props.otherClassNames === undefined
            ? ''
            : this.props.otherClassNames
        
        return (
        
            <div id={ this.props.id } 
                 className={ 
                    'dropdown-box '
                    + disableDropdownBoxClassName + ' '
                    + otherClassNames + ' '
                    + this.state.isOpenedClass + ' '
                    + this.makeSelectedClassName()
                }
                data-name={ this.props.name }
                data-items-selected={ this.itemsSelected }
                ref={ self => this.dom = self }
            >   
                { this.renderDropdownBoxHeader() }
                { this.renderDropdownContent() }
            </div>
        );
    }
}

class DropdownBoxGroup extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.handleGroupSelect = this.handleGroupSelect.bind( this );

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
    }
    
    handleGroupSelect( event, dropdownBoxIndex ) {
        
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
            
            } );
        }
    }
    
    renderDropdownBox( attr, index ) {
        
        return (
            <li key={ attr.id } >
                <DropdownBox
                    type={ attr.type }
                    id={ attr.id }
                    name={ attr.name }
                    title={ attr.title }
                    listItems={ this.state.data[ index ] }
                    onGroupSelect={ ( event ) => this.handleGroupSelect( event, index ) }
                    onSelect={ this.props.onChange }
                />
            </li>
        );
    }
    
    renderOtherDropdownBoxes() {
        
        let others = this.props.otherDropdownBoxes;
        
        if ( others === undefined ) {
            
            return '';
        }
        
        return others.map( attr => 
        
            <li key={ attr.id } >
                <DropdownBox
                    type={ attr.type }
                    id={ attr.id }
                    name={ attr.name }
                    title={ attr.title }
                    listItems={ attr.listItems }
                    onSelect={ this.props.onChange }
                />
            </li>
        );
    }
    
    render() {
        // console.log( 'render', this.state.data );
        return (
        
            <ul className="control-list clearfix">
                { 
                    this.props.children.map( ( child, index ) => {

                        return this.renderDropdownBox( child, index );
                    } )
                }
                { this.renderOtherDropdownBoxes() }
            </ul>
        )
    }

}

/* Global events */
DropdownBox.boxes = [];

document.addEventListener( 'mouseup', ( event ) => {
    
    DropdownBox.boxes.forEach( ( box ) => {

        if ( UTILS.isDescendant( event.target, box.dom ) === false ){
            
            box.close();
        }

    } );
} );

export { DropdownBox, DropdownBoxGroup };




