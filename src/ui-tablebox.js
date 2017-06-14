import React from 'react';
import { DropdownBox } from './ui-dropdownbox';

const UTILS = require( './utils.js' );

class TableHeader extends React.Component {
    
    renderCustomiseButton() {
        
        return <button className="customise">Customise</button>
    }
    
    renderExportButton() {
        
        return <button className="export-all">Export all to CSV</button>
    }
    
    render() {
        
        return (
            <div className="table-box-header clearfix">
                <h1 className="table-box-heading">Search Results</h1>
                <h2 className="number-displayed-heading">
                    Displaying { this.props.numberOfRowsDisplayed } Items
                    ( { this.props.numberOfRowsInTotal } total )
                </h2>
                { /* this.renderCustomiseButton() */ }
                { /* this.renderExportButton() */ }
            </div>
        );
    }
}

class TableData extends React.Component {
    
    render() {
        return (
        
            <label onClick={ this.props.onClick }>
                { this.props.data }
            </label>
        );
    }
}

class TableRow extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.type = this.props.type;
        this.row = this.props.rowData;

    }
    
    renderHeaderRow() {
        
        return Object.keys( this.row ).map( columnName => 
                    
            <TableData key={ columnName } 
                       data={ columnName }
                       onClick={ this.props.onClick }
                        
            />
        )
    }
    
    renderContentRow() {

        let row = this.props.rowData;
        
        return Object.keys( row ).map( ( columnName, index ) => 
            
            <TableData key={ index } data={ row[ columnName ] } />
        )
    }
    
    render() {
        
        if ( this.type === 'header' ) {
            
            return (
                
                <li className="table-box-main-header">
                    { this.renderHeaderRow() }
                </li>
            
            );
        }
        else if( this.type === 'row' ) {
            
            return (
                <li>
                    { this.renderContentRow() }
                </li>
            )
        }
    }
}

class TableMain extends React.Component {
    
    constructor( props ) {
        
        super( props );
        this.rows = [];
    }

    renderHeader() {
        
        return (
            
            <TableRow type="header"
                      rowData={ this.rows[0] }
                      onClick={ this.props.onSort }
            />
        )
    }
    
    renderContent() {
        
        // console.log( 'tablerows', this.rows );
        
        return (
            this.rows.map( ( row, index ) => {
                // console.log( row, index );
                 
                return <TableRow type="row" key={ index } rowData={ row } /> 
            } )
        );
    }
    
    render() {
        
        this.rows = this.props.tableRows;

        if ( this.rows.length === 0 ) {
            
            return null;
        }
 
        return (
            <ul className="table-box-main">
                { this.renderHeader() }
                { this.renderContent() }
            </ul>
        );
    }
}

class TableFooter extends React.Component {
    
    render() {
        // Use [ '15', '30' ] not [ 15, 30 ], Possible bug in React or Babel
        const numberPerPageOptions = this.props.numberPerPageOptions === undefined
            ? [ '15', '30' ]
            : this.props.numberPerPageOptions;
        
        return (
            <div className="table-box-footer">
                <div className="per-page">
                    No. of items per page 
                    <DropdownBox
                        type="basic"
                        otherClassNames="num-per-page"
                        name={ this.props.numberPerPage }
                        listItems={ numberPerPageOptions }
                        onSelect={ this.props.onNumberPerPageChange }
                    />
                </div>
                <div className="pager">
                    <label className="pager-prev"
                           onClick={ this.props.onPreviousClick } 
                    >
                        &lt;
                    </label>
                    <label className="pager-current">
                        { 
                            this.props.currentPageNumber 
                                + ' of ' 
                                + this.props.totalNumberOfPage 
                        }
                    </label>
                    <label className="pager-next"
                           onClick={ this.props.onNextClick }
                    >
                        &gt;
                    </label>
                </div>
            </div>
        );
    }
}

class TableBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        
        this.handleNumberPerPageChange = this.handleNumberPerPageChange.bind( this );
        this.handlePreviousClick = this.handlePreviousClick.bind( this );
        this.handleNextClick = this.handleNextClick.bind( this );
        this.handleSort = this.handleSort.bind( this );
        
        this.currentPageNumber = this.props.currentPageNumber;
        this.numberPerPage = parseInt( this.props.numberPerPage, 10 );
        this.totalPage = 0;
        this.rowsAll = this.props.rowData;
        this.rowsDisplayed = [];
        
        this.state = {
            
            numberPerPage: this.numberPerPage,
            currentPageNumber: this.currentPageNumber,
            rowsDisplayed: this.rowsDisplayed
        };
    }
    
    handleNumberPerPageChange( event ) {
        
        let newNumberPerPage = parseInt( event.target.textContent, 10 );
        
        if ( newNumberPerPage === this.numberPerPage ) {
            return ;
        }
        
        this.numberPerPage = newNumberPerPage;
        this.currentPageNumber = 1;
        this.setState( { 
        
            numberPerPage: this.numberPerPage,
            currentPageNumber: this.currentPageNumber
            
        } );
    }
    
    handlePreviousClick( event ) {
        
        if ( this.currentPageNumber <= 1 ) {
            
            return ;
        }
        
        this.currentPageNumber --;
        
        this.setState( {
        
            currentPageNumber: this.currentPageNumber
        } );
    }
    
    handleNextClick( event ) {
        
        if ( this.currentPageNumber >= this.totalPage ) {
            
            return ;
        }
        
        this.currentPageNumber ++;
        
        this.setState( {
            
           currentPageNumber: this.currentPageNumber 
        
        } );
    }
    
    handleSort( event ) {
        this.rows = this.props.rowData;
        
        let key = event.target.textContent;
        let key2 = 'Transaction ID';
        
        let sortOptions = {
            
            type: 'quick',
            order: 'ascend',
            objectKey: key,
            secondObjectKey: key2
        };
        
        UTILS.sortArrayByObjectKey( sortOptions, this.rows, key, key2 );
        
        // Call this function to update UI, even it's an empty object
        // But this.rows' value has actually changed.
        this.setState( {
            
            // rowsDisplayed: this.rowsDisplay
            
        } );
        
    }
    
    render () {
        // Assign this.rowsAll here because data is received asynchronously by AJAX
        this.rowsAll = this.props.rowData;
        // console.log( 'rowsAll', this.rowsAll );
        let numberOfRowsInTotal = this.rowsAll.length;
        let sliceStart = ( this.currentPageNumber - 1 ) * this.numberPerPage;
        let sliceEnd = this.currentPageNumber * this.numberPerPage;

        this.rowsDisplayed = numberOfRowsInTotal <= this.numberPerPage
            ? this.rowsAll
            : this.rowsAll.slice( sliceStart, sliceEnd );
        
        // console.log( 'rows displayed', rowsDisplayed );
        this.totalPage = Math.ceil( numberOfRowsInTotal / this.numberPerPage );
            
        return (
        
            <div className="table-box">
                <TableHeader 
                    numberOfRowsDisplayed={ this.rowsDisplayed.length }
                    numberOfRowsInTotal={ numberOfRowsInTotal }
                />
                <TableMain
                    columnNames={ this.props.columnNames }
                    tableRows={ this.rowsDisplayed }
                    onSort={ this.handleSort }
                />
                <TableFooter
                    className="clearfix"
                    numberPerPage={ this.numberPerPage }
                    currentPageNumber={ this.currentPageNumber }
                    totalNumberOfPage={ this.totalPage }
                    numberPerPageOptions={ this.props.numberPerPageOptions }
                    onNumberPerPageChange={ this.handleNumberPerPageChange }
                    onPreviousClick={ this.handlePreviousClick }
                    onNextClick={ this.handleNextClick }
                />
            </div>
        );
    }
}

export { TableBox }