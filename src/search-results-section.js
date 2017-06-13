import React from 'react';
import { TableBox } from './ui-tablebox';
import 'whatwg-fetch';

class SearchResultsSection extends React.Component {

    constructor( props ) {
        
        super( props );

        this.defaultCurrentPageNumber = 1;
        this.defaultNumberPerPage = 10;
    }
    
    render() {
        
        // Use [ '15', '30', '50' ] instead of [ 15, 30, 50 ], 
        // Could be a bug in React or Babel or elsewhere
        return (
            <div id="latest-transactions-content" className="section-box">
                <TableBox
                    rowData={ this.props.searchResults } 
                    numberPerPage={ this.defaultNumberPerPage }
                    currentPageNumber={ this.defaultCurrentPageNumber }
                    numberPerPageOptions={ [ '10', '30', '50', '100', '200' ] }
                />
            </div>
        );
    }
}

export { SearchResultsSection };
