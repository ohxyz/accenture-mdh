import React from 'react';
import { DropdownBox } from './ui-dropdownbox';

class TableHeader extends React.Component {
    
    render() {
        
        return (
        
            <div className="table-box-header clearfix">
                <h1 className="table-box-heading">Search Results</h1>
                <h2 className="number-displayed-heading">
                    Displaying { this.props.numberOfRowsDisplayed } Items
                    ( { this.props.numberOfRowsInTotal } total ) 
                </h2>
                <button className="customise">Customise</button>
                <button className="export-all">Export all to CSV</button>
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
    }
    
    renderHeaderRow( item, columnIndex ) {
        
        return (
        
            <TableData key={ columnIndex } 
                       data={ item }
                       onClick={ ( event ) => this.props.onClick( event, columnIndex ) } 
            />
        );
    }
    
    renderContentRow( item, columnIndex ) {
        
        return (
        
            <TableData key={ columnIndex } 
                       data={ item }
            />
        );
        
    }
    
    render() {
        
        let cssClass = '';
        
        if ( this.type === 'header' ) {
            cssClass = 'table-box-main-header';
        }
        
        return (
            <li className={ cssClass } >
            { 
                this.props.data.map( ( item, index ) => {
                    
                    if ( this.type === 'header' ) {
                        
                        return this.renderHeaderRow( item, index );
                    }
                    else {
                        
                        return this.renderContentRow( item, index );
                    }
                    
                    
                } )
            }
            </li>
        );
    }
}

class TableMain extends React.Component {
    
    renderHeader() {
        
        return (
            
            <TableRow type="header" 
                      data={ this.props.columnNames }
                      onClick={ this.props.onSort }
            />
        
        )
    }
    
    renderContent() {
        
        return (
            this.props.tableRows.map( ( item, index ) => 
                    
                <TableRow type="row" key={ index } data={ item } /> 
            )
        );
    }
    
    render() {

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
        
        
        this.state = {
            
            numberPerPage: this.numberPerPage,
            currentPageNumber: this.currentPageNumber
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
    
    handleSort( event, index ) {
        
        console.log( event.target.textContent, index );
        
    }
    
    render () {
        // Assign this.rowsAll here because data is received asynchronously by AJAX
        this.rowsAll = this.props.rowData;
        console.log( 'rowsAll', this.rowsAll );
        let numberOfRowsInTotal = this.rowsAll.length;
        let sliceStart = ( this.currentPageNumber - 1 ) * this.numberPerPage;
        let sliceEnd = this.currentPageNumber * this.numberPerPage;

        let rowsDisplayed = numberOfRowsInTotal <= this.numberPerPage
            ? this.rowsAll
            : this.rowsAll.slice( sliceStart, sliceEnd );
        
        this.totalPage = Math.ceil( numberOfRowsInTotal / this.numberPerPage );
            
        return (
        
            <div className="table-box">
                <TableHeader 
                    numberOfRowsDisplayed={ rowsDisplayed.length }
                    numberOfRowsInTotal={ numberOfRowsInTotal }
                />
                <TableMain
                    columnNames={ this.props.columnNames }
                    tableRows={ rowsDisplayed }
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