import React from 'react';
import { TableBox } from './ui-tablebox';
import 'whatwg-fetch';

class SearchResultsSection extends React.Component {

    constructor( props ) {
        
        super( props );

        this.state = {
            
            currentPage: 1,
            numPerPage: 15,
        };
    }
    
    render() {
        
        let tableHeaderContent = [
            'Transaction ID',
            'Transaction Group',
            'Date Created',
            'Transaction Ref No.',
            'Transaction Date'
        ];
        
        //console.log( 'in render state self', this.state )
        //console.log( 'in render props ', this.props.searchResults );
        
        // Use [ '15', '30', '50' ] instead of [ 15, 30, 50 ], 
        // Could be a bug in React or Babel or elsewhere
        return (
            <div id="latest-transactions-content" className="section-box">
                <TableBox
                    columnNames={ tableHeaderContent }
                    rowData={ this.props.searchResults } 
                    numberPerPage={ this.state.numPerPage }
                    currentPageNumber={ this.state.currentPage }
                    numberPerPageOptions={ [ '15', '30', '50' ] }
                />
            </div>
        );
    }
}

export { SearchResultsSection };
