import React from 'react';
import { DropdownBox } from './ui-dropdownbox';

class TableHeader extends React.Component {
    
    render() {
        return (
        
            <div className="table-box-header clearfix">
                <h1 className="table-box-heading">Search Results</h1>
                <h2 className="number-displayed-heading">
                    Displaying { this.props.numberOfRowsDisplayed } Items
                    ( { this.props.numberOfRowsInTotal } in Total ) 
                </h2>
                <button className="customise">Customise</button>
                <button className="export-all">Export all to CSV</button>
            </div>
        )
    }
}

class TableData extends React.Component {
    
    render() {
        return (
        
            <label>{ this.props.data }</label>
        )
    }
}

class TableRow extends React.Component {
    
    render() {
        
        let cssClass = '';
        
        if ( this.props.type === 'header' ) {
            cssClass = 'table-box-main-header';
        }
        
        return (
            <li className = { cssClass }>
            { 
                this.props.data.map( ( item, index ) => 
                    
                    <TableData key={ index } data={ item } /> 
                ) 
            }
            </li>
        )
    }
}

class TableMain extends React.Component {
    
    renderHeader() {
        
        return <TableRow type="header" data={ this.props.columnNames } />
    }
    
    renderContent() {
        
        return (
            this.props.tableRows.map( ( item, index ) => 
                    
                <TableRow type="row" key={ index } data={ item } /> 
            )
        )
    }
    
    render() {

        return (
            <ul className="table-box-main">
                { this.renderHeader() }
                { this.renderContent() }
            </ul>
        )
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
                    />
                </div>
                <div className="pager">
                    <label className="pager-prev">&lt;</label>
                    <label className="pager-current">
                        { 
                            this.props.currentPageNumber 
                                + ' of ' 
                                + this.props.totalNumberOfPage 
                        }
                    </label>
                    <label className="pager-next">&gt;</label>
                </div>
            </div>
        )
    }
}

class TableBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        //console.log( 'table-box constructor', this.props.rowData );

    }
    
    render () {
        //console.log( 'in ui-tablebox', this.props.rowData );
        
        let numberPerPage = parseInt( this.props.numberPerPage, 10 );
        let rowsInTotal = this.props.rowData;
        let numberOfRowsInTotal = rowsInTotal.length;
        
        let rowsDisplayed = numberOfRowsInTotal <= numberPerPage
            ? rowsInTotal
            : rowsInTotal.slice( 0, numberPerPage )
        
        let totalPage = Math.ceil( numberOfRowsInTotal / numberPerPage );
            
        return (
        
            <div className="table-box">
                <TableHeader 
                    numberOfRowsDisplayed={ rowsDisplayed.length }
                    numberOfRowsInTotal= { numberOfRowsInTotal }
                />
                <TableMain
                    columnNames={ this.props.columnNames}
                    tableRows={ rowsDisplayed }
                />
                <TableFooter
                    className="clearfix"
                    numberPerPage={ numberPerPage }
                    currentPageNumber={ this.props.currentPageNumber }
                    totalNumberOfPage={ totalPage }
                    numberPerPageOptions={ this.props.numberPerPageOptions }
                />
            </div>
        )
    }
}

export { TableBox }