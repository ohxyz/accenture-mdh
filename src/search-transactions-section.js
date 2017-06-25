import React from 'react';
import { DropdownBox, DropdownBoxGroup } from './ui-dropdown-box';
import { TextBox } from './ui-text-box';
import { CheckBox } from './ui-check-box';
import { DateBox } from './ui-date-box';
import { MessageBox } from './ui-message-box';
import { GLOBAL, LOCAL_DATA } from './config';

class BasicSearch extends React.Component {

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
                                 title="NMI / MIRN"
                                 rule={ { name: 'numeric', min: 10, max: 10 } }
                                 onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox id="transaction-id"
                                 name="transaction-id"
                                 title="Transaction ID"
                                 rule={ { name: 'positive-integer' } }
                                 onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox id="message-id"
                                 name="message-id"
                                 title="Message ID"
                                 rule={ { name: 'alphanumeric-underscore-dash' } }
                                 onChange={ this.props.onChange }
                        />
                    </li>
                </ul>
                <DropdownBoxGroup
                    children={ LOCAL_DATA.attrsOfDropdownBoxes }
                    data={ LOCAL_DATA.transactionCategory }
                    onChange={ this.props.onChange }
                    otherDropdownBoxes={ otherDropdownBoxes }
                />                    
            </div>
            
        );
    }
}

class AdvancedSearch extends React.Component {
    
    render() {
       
        const style = this.props.display === true
            ? { display: 'block' } 
            : { display: 'none' };
        
        return (

            <div id="advanced-search-section" style={ style} >
                <ul className="control-list clearfix">
                    <li>
						<DropdownBox
                            type="single"
							id="sending-participants"
                            name="sending-participants"
					        title="Sending Participant"
                            listItems={ LOCAL_DATA.sendingParticipants }
                            onSelect={ this.props.onChange }
                        />
				    </li>
                    <li>
						<DropdownBox
							id="receiving-participants"
                            name="receiving-participants"
							title="Receiving Participant"
                            listItems={ LOCAL_DATA.receivingParticipants }
                            onSelect={ this.props.onChange }
                        />
				    </li>
                    <li>
						<CheckBox
							id="unsolicited-responses"
							name="unsolicited-responses"
                            title="Unsolicited Responses"
                            onClick={ this.props.onChange }
                        />
				    </li>
                    <li style={ {visibility: 'hidden' } }>
						<TextBox value="Place Holder" />
				    </li>
                    <li>
                        <DateBox 
                            id="date-created-from" 
                            name="date-created-from"
                            title="Date Created from"
                            onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <DateBox                        
                            id="date-created-to"
                            name="date-created-to"
                            title="Date Created to"
                            onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox title="Time Created from" />
                    </li>
                    <li>
                        <TextBox title="Time Created to" /> 
                    </li>
                    <li>
						<DropdownBox
                            type="multiple"
							id="service-order-type"
                            name="service-order-type"
							title="Service Order Type"
                            listItems={ LOCAL_DATA.serviceOrderType }
                            onSelect={ this.props.onChange }
                        />
					</li>
                    <li>
                        <DropdownBox
                            type="multiple"
							id="service-order-subtype"
                            name="service-order-subtype"
							title="Service Order Subtype"
                            listItems={ LOCAL_DATA.serviceOrderSubtype }
                            onSelect={ this.props.onChange }
                        />
					</li>
                    <li>
                        <TextBox 
							id="service-order-number"
                            name="service-order-number"
							title="Service Order Number"
                            rule={ { name: "numeric", min: 1, max: 5 } }
                            error="1 to 5 digits"
                            onChange={ this.props.onChange }
                        />
					</li>
                    <li>
						<DropdownBox
                            type="multiple"
							id="cr-code"
                            name="cr-code"
							title="CR Code"
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
        this.toggleSearchModeClick =
            this.toggleSearchModeClick.bind( this );
        
        this.enableAdvancedSearch = GLOBAL.enableAdvancedSearch;
        this.searchModeText = '';
        
        this.setSearchModeText();
        
        this.state = {
            enableAdvancedSearch: this.enableAdvancedSearch,
            toggleSearchModeText: this.searchModeText
        };

    }
    
    setSearchModeText() {
        
        this.searchModeText = this.enableAdvancedSearch === true
            ? 'Collapse'
            : 'Advanced Search';
    }
    
    toggleSearchModeClick() {
        
        this.enableAdvancedSearch = !this.enableAdvancedSearch;
        this.setSearchModeText();

        this.setState( {
            
            enableAdvancedSearch: this.enableAdvancedSearch
        } );
    }
    
    renderQuickSearchButton() {
        
        return <button id="quick-search">Quick Search</button>
    }
    
    renderErroMessage() {
        
        return (
        
            <MessageBox
                type="error"
                title="Error message"
                subtitle="Error message information"
                content="Lots of errors found !"
            />
            
        );
    }
    
    render() {
        
        return (
            <div id="search-transactions-content" className="section-box">
                { /* this.renderQuickSearchButton() */ }
                <h1>Search Transactions</h1>
                <h2>Enter all the correcct information in their respective fields.</h2>
                <BasicSearch
                    defaultInputValues={ this.props.defaultInputValues }
                    onChange={ this.props.onChange }
                />
                <AdvancedSearch
                    display={ this.enableAdvancedSearch }
                    onChange={ this.props.onChange }
                />
                <SearchControls
                    onSearch={ this.props.onSearch }
                    toggleSearchModeClick={ this.toggleSearchModeClick } 
                    toggleSearchModeText={ this.searchModeText }
                />
            </div>
        )
    }
}

export { SearchTransactionsSection };