import React from 'react';
import { DropdownBox } from './ui-dropdownbox';

class TableHeader extends React.Component {
    
    render() {
        return (
        
            <div id="search-results-header" className="clearfix">
                <h1 id="search-results-heading">Search Results</h1>
                <h2 id="displaying-heading">Displaying 15 Items</h2>
                <button id="customise">Customise</button>
                <button id="export-all">Export all to CSV</button>
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
            cssClass = 'table-header';
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
            <ul className="table-main">
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
                            this.props.currentNumberOfPage 
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
    
    render () {
            
        return (
        
            <div className="table-box">
                <TableHeader />
                <TableMain
                    columnNames={ this.props.columnNames}
                    tableRows={ this.props.rowData }
                />
                <TableFooter
                    className="clearfix"
                    numberPerPage={ this.props.numberPerPage }
                    currentNumberOfPage={ this.props.currentNumberOfPage }
                    totalNumberOfPage={ this.props.totalNumberOfPage }
                    numberPerPageOptions={ this.props.numberPerPageOptions }
                />
            </div>
        )
    }
}

export { TableBox }