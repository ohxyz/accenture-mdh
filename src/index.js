import React from 'react';
import ReactDOM from 'react-dom';
import { SearchResults } from './search-results';
import { TextBox, DropdownBox, DropdownBoxGroup } from './ui-components';
import 'whatwg-fetch';
import './style/index.css';

class BasicSearch extends React.Component {
    
    constructor() {
        super();
        
        this.textBoxes = [
        
            {
                id: 'transaction-id',
                name: 'transaction-id',
                value: 'Transaction ID'
            },
            
            {
                id: 'message-id',
                name: 'message-name',
                value: 'Message ID'
            },
            
            {
                id: 'nmi-mirn',
                name: 'nmi-mirn',
                value: 'NMI / MIRN'
            }
            
        ];
                
        this.cascadedData = {
            
            "Group A": {
                
                "Group A Type 1": {
                    "A1 Status I": true,
                    "A1 Status II": true,
                    "A1 Status III": true
                },
                
                "Group A Type 2": {
                    "A2 Status I": true,
                    "A2 Status II": true,
                    "A2 Status III": true
                } 
            },
            
            "Group B": {
                
                "Group B Type 1": {
                    "B1 Status I": true,
                    "B1 Status II": true,
                    "B1 Status III": true
                },
                
                "Group B Type 2": {
                    "B2 Status I": true,
                    "B2 Status II": true,
                    "B2 Status III": true
                } 
            }
        }
        
        this.transactionCategory = {
            
            "SORD": {
                
                "ServiceOrderRequest": {},
                "ServiceOrderResponse": {},
            },
            
            "CATS": {
                
                "CATSChangeAlert": {},
                "CATSObjectionWithdrawal": {},
                "CATSChangeWithdrawal": {},
                "CATSObjectionRequest": {},
                "CATSChangeRequest": {},
                "CATSChangeResponse": {},
                "CATSDataRequest": {},
                "CATSObjectionResponse": {},
                "TransactionAcknowledgement": {},
                "CATSNotification": {},
                "ReportRequest": {},
                "ReportResponse": {},
                "ReplicationRequest": {}   
            }
        };
    }

    render() {
        
        const listItems = [ 'Basic One', 'Basic Two', 'Basic Three' ];
        const dropdownBoxAttrs = 
        [
            {
                type: 'multiple',
                id: 'transaction-group',
                name: 'Transaction Group',
                listItems: listItems
            },
            
            
            {        
                type: 'multiple',
                id: 'transaction-type',
                name: 'Transaction Type',
                listItems: listItems
            },
            /*
            {        
                type: 'multiple',
                id: 'transaction-status',
                name: 'Transaction Status',
                listItems: listItems
            },
            */
        ];

        return (
            <div id="basic-search">
                <ul className="control-list clearfix">
                    <li>
                        <TextBox id={ this.textBoxes[0].id }
                                 name={ this.textBoxes[0].name }
                                 value={ this.textBoxes[0].value }
                        />
                    </li>
                    <li>
                        <TextBox id={ this.textBoxes[1].id }
                                 name={ this.textBoxes[1].name }
                                 value={ this.textBoxes[1].value }
                        />
                    </li>
                    <li>
                        <DropdownBox
							type="single"
							id="fuel-type"
							name="Fuel Type"
                            itemsSelected= { [ 'Electricity' ] }
                            listItems={ [ 'Gas', 'Electricity' ] }
						/>
                    </li>
                    <li>
                        <TextBox id={ this.textBoxes[2].id }
                                 name={ this.textBoxes[2].name }
                                 value={ this.textBoxes[2].value }
                        />
                    </li>
                </ul>
                <DropdownBoxGroup
                    children= { dropdownBoxAttrs }
                    data = { this.transactionCategory }
                />
            </div>
            
        );
    }
}

class AdvancedSearch extends React.Component {
    
    render() {
       
        const style = this.props.display 
            ? { display: 'block' } 
            : { display: 'none' };
        
        const listItems = [ 'Advanced One', 'Advanced Two', 'Advanced Three'];
        
        return (

            <div id="advanced-search" style={ style} >
                <ul className="control-list clearfix">
                    <li>
						<DropdownBox
                            type="single"
							id="sending-participants"
					        name="Sending Participant"
                            listItems={ listItems }
                        />
				    </li>
                    <li>
						<DropdownBox
							id="receiving-participants"
							name="Receiving Participant"
                            listItems={ listItems }
                        />
				    </li>
                    <li>
						<TextBox
							id="unsolicited-responses"
							value="Unsolicited Responses"
                            listItems={ listItems }
                        />
				    </li>
                    <li style={ {visibility: 'hidden' } }>
						<TextBox value="Place Holder" />
				    </li>
                    <li><TextBox id="date-created-from" value="Date Created from" /></li>
                    <li><TextBox id="date-created-to" value="Date Created to" /></li>
                    <li><TextBox value="Time Created from" /></li>
                    <li><TextBox value="Time Created to" /></li>
                    <li>
						<DropdownBox
                            type="multiple"
							id="service-order-type"
							name="Service Order Type"
                            itemsSelected={ ['Advanced Two', 'Advanced Three']}
                            listItems={ listItems }
                        />
					</li>
                    <li><DropdownBox 
							id="service-order-subtype"
							name="Service Order SubType"
                            listItems={ listItems }
                        />
					</li>
                    <li><DropdownBox 
							id="service-order-number"
							name="Service Order Number"
                            listItems={ listItems }
                        />
					</li>
                    <li>
						<DropdownBox 
							id="cr-code" 
							name="CR Code"
                            listItems={ listItems }
                        />
				    </li>
                </ul>
            </div>
        )
    }
}

class SearchControls extends React.Component {
    
    render() {
        
        return (
            <div id="search-controls" className="clearfix">
                <label id="clear-all-fields">Clear All Fields</label>
                <button id="search-button"
                        onClick={ this.props.onSearch } 
                >
                    Search
                </button>
                <label id="toggle-search-mode" 
                       onClick={ this.props.toggleSearchModeClick }
                >
                    { this.props.toggleSearchModeText }
                </label>
            </div>
        );
    }
}

class SearchTransactionsSection extends React.Component {
    
    constructor() {
        
        super();
        this.state = {
            enableAdvancedSearch: false,
            toggleSearchModeText: 'Advanced Search'
        };
        
        this.toggleSearchModeClick =
            this.toggleSearchModeClick.bind( this );
    }
    
    toggleSearchModeClick() {

        if ( this.state.enableAdvancedSearch === true ){
            
            this.setState( { 
                
                enableAdvancedSearch: false,
                toggleSearchModeText: 'Advanced Search'
            });
        }
        else {
            
            this.setState( { 
                
                enableAdvancedSearch: true,
                toggleSearchModeText: 'Collapse'
            });
        }
    }
    
    render() {
        
        return (
            <div id="search-transactions-content" className="section-box">
                <button id="quick-search">Quick Search</button>
                <h1>Search Transactions</h1>
                <h2>Enter all the correcct information in their respective fields.</h2>
                <BasicSearch />
                <AdvancedSearch display={ this.state.enableAdvancedSearch }/>
                <SearchControls
                    onSearch={ this.props.onSearch }
                    toggleSearchModeClick={ this.toggleSearchModeClick } 
                    toggleSearchModeText={ this.state.toggleSearchModeText }
                />
            </div>
        )
    }
}

class App extends React.Component {
    
    constructor() {
        
        super();
        this.handleSearch = this.handleSearch.bind( this );
        
        this.state = {
            
            showSearchResults: false
        };
    }
    
    handleSearch( event ) {
        
        console.log( 'search button', event.target );
        
        this.setState( {
            
            showSearchResults: true
            
        } );
    }
    
    renderSearchResultsSection() {
        
        if ( this.state.showSearchResults === true ) {
        
            return (
            
                <section id="search-results-section" >
                    <SearchResults />
                </section>
            
            )
        }
        
        return '';
    }
    
    render() {
        
        return (
            <div id="app">
                <section id="search-transactions-section">
                    <SearchTransactionsSection
                        onSearch={ this.handleSearch }
                    />
                </section>
                { this.renderSearchResultsSection() }
            </div>
        )
    }
}

ReactDOM.render(

    <App />,
    document.getElementById( 'root' )

);

/*
ReactDOM.render(
    <SearchTransactionsSection />,
    document.getElementById( 'search-transactions-section' )
);

ReactDOM.render(
    
    <SearchResults />,
    document.getElementById( 'search-results-section' )
);
*/

