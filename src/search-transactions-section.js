import React from 'react';
import { DropdownBox, DropdownBoxGroup } from './ui-dropdownbox';
import { TextBox } from './ui-textbox';

class BasicSearch extends React.Component {
    
    constructor() {
        
        super();
                
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
                /*
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
                */
            }
        };
    }

    render() {
        
        const listItems = [ 'Basic One', 'Basic Two', 'Basic Three' ];
        const attrsOfDropdownBoxes = 
        [
            {
                type: 'multiple',
                id: 'transaction-group',
                name: 'transaction-group',
                title: 'Transaction Group',
                listItems: listItems
            },
            
            
            {        
                type: 'multiple',
                id: 'transaction-type',
                name: 'transaction-type',
                title: 'Transaction Type',
                listItems: listItems
            },
        ];
                        
        const transactionStatus = [
            'Completed',
            'Requested',
            'Cancelled',
            'Objected',
            'Pending Acknowledgement',
            'PACN',
            'Rejected'
        ];
        
        const otherDropdownBoxes = [
        
            {
                type: "multiple",
                id: "transaction-status",
                name: "transaction-status",
                title: "Transaction Status",
                listItems: transactionStatus,
                onChange: this.props.onChange
            }
        
        ];
         
        return (
            <div id="basic-search">
                <ul className="control-list clearfix">
                    <li>
                        <DropdownBox
							type="single"
							id="fuel-type"
                            name="fuel-type"
							title="Fuel Type"
                            itemsSelected={ this.props.defaultInputValues[ 'fuel-type' ] }
                            listItems={ [ 'Gas', 'Electricity' ] }
                            onSelect={ this.props.onChange }
						/>
                    </li>
                    <li>
                        <TextBox id="nmi-mirn"
                                 name="nmi-mirn"
                                 value="NMI / MIRN"
                                 onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox id="transaction-id"
                                 name="transaction-id"
                                 value="Transaction ID"
                                 onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox id="message-id"
                                 name="message-id"
                                 value="Message ID"
                                 onChange={ this.props.onChange }
                        />
                    </li>
                </ul>
                <DropdownBoxGroup
                    children={ attrsOfDropdownBoxes }
                    data={ this.transactionCategory }
                    onChange={ this.props.onChange }
                    otherDropdownBoxes={ otherDropdownBoxes }
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
                            name="sending-participants"
					        title="Sending Participant"
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
                        />
				    </li>
                    <li>
						<DropdownBox
							id="receiving-participants"
                            name="receiving-participants"
							title="Receiving Participant"
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
                        />
				    </li>
                    <li>
						<TextBox
							id="unsolicited-responses"
							value="Unsolicited Responses"
                        />
				    </li>
                    <li style={ {visibility: 'hidden' } }>
						<TextBox value="Place Holder" />
				    </li>
                    <li>
                        <TextBox 
                            id="date-created-from" 
                            name="date-created-from"
                            value="Date Created from"
                            onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox 
                            id="date-created-to"
                            name="date-created-to"
                            value="Date Created to" 
                            onChange={ this.props.onChange }
                        />
                    </li>
                    <li><TextBox value="Time Created from" /></li>
                    <li><TextBox value="Time Created to" /></li>
                    <li>
						<DropdownBox
                            type="multiple"
							id="service-order-type"
                            name="service-order-type"
							title="Service Order Type"
                            itemsSelected={ ['Advanced Two', 'Advanced Three'] }
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
                        />
					</li>
                    <li><DropdownBox 
							id="service-order-subtype"
                            name="service-order-subtype"
							title="Service Order Subtype"
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
                        />
					</li>
                    <li><DropdownBox 
							id="service-order-number"
                            name="service-order-number"
							title="Service Order Number"
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
                        />
					</li>
                    <li>
						<DropdownBox 
							id="cr-code"
                            name="cr-code"
							title="CR Code"
                            listItems={ listItems }
                            onSelect={ this.props.onChange }
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
    
    renderQuickSearchButton() {
        
        return <button id="quick-search">Quick Search</button>
    }
    
    render() {
        
        return (
            <div id="search-transactions-content" className="section-box">
                { this.renderQuickSearchButton() }
                <h1>Search Transactions</h1>
                <h2>Enter all the correcct information in their respective fields.</h2>
                <BasicSearch
                    defaultInputValues={ this.props.defaultInputValues }
                    onChange={ this.props.onChange }
                />
                <AdvancedSearch
                    display={ this.state.enableAdvancedSearch }
                    onChange={ this.props.onChange }
                />
                <SearchControls
                    onSearch={ this.props.onSearch }
                    toggleSearchModeClick={ this.toggleSearchModeClick } 
                    toggleSearchModeText={ this.state.toggleSearchModeText }
                />
            </div>
        )
    }
}

export { SearchTransactionsSection };