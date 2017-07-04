import React from 'react';
import { 
    TextBox, 
    CheckBox, 
    DateBox, 
    MessageBox, 
    DropdownBox, 
    DropdownBoxGroup } from './ui-box/ui-box';
import { GLOBAL, LOCAL_DATA } from './config';


class BasicSearch extends React.Component {

    render() {

        const otherDropdownBoxes = [
        
            {
                type: "multiple",
                id: "transaction-status",
                name: "transaction-status",
                title: "Transaction Status",
                listItems: LOCAL_DATA.transactionStatus,
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
                            listItems={ LOCAL_DATA.fuelTypes }
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
                        <TextBox 
                            id="time-created-from"
                            name="time-created-from"
                            title="Time Created from"
                            rule={ { name: 'time' } }
                            onChange={ this.props.onChange }
                        />
                    </li>
                    <li>
                        <TextBox 
                            id="time-created-to"
                            name="time-created-to"
                            title="Time Created to"
                            rule={ { name: 'time' } }
                            onChange={ this.props.onChange }
                        />
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
                            listItems={ LOCAL_DATA.crCode }
                            onSelect={ this.props.onChange }
                        />
				    </li>
                </ul>
            </div>
        )
    }
}

class SearchControls extends React.Component {
    
    constructor( props ) {
        
        super( props );
        
        this.handleSearch = this.handleSearch.bind( this );
        
        this.isSearching = props.isSearching;
        this.state = {
            
            isSearching: false
        }
        
    }
    
    renderSearchButtonStaticIcon() {
        
        return (
        
            <svg className="svg-search-button-icon" viewBox="0 0 34 36.5">
                <path d="M28.4,26.6l-4.7-4.7c2.5-3.9,2.1-9.2-1.4-12.7c-4-4-10.4-4-14.4,0c-4,4-4,10.4,0,14.4
                    c3.4,3.4,8.8,3.9,12.7,1.4l4.7,4.7c0.9,0.9,2.2,0.9,3.1,0C29.3,28.8,29.3,27.4,28.4,26.6z M19.7,20.9c-2.5,2.5-6.6,2.5-9.1,0
                    c-2.5-2.5-2.5-6.6,0-9.1c2.5-2.5,6.6-2.5,9.1,0C22.2,14.4,22.2,18.4,19.7,20.9z"/>
            </svg>
        );
    }
    
    renderSearchButtonLoadingIcon() {
        
        return (
        
            <svg className="svg-search-button-icon" viewBox="0 0 34 36.5">
                <path d="M28.4,26.6l-4.7-4.7c2.5-3.9,2.1-9.2-1.4-12.7c-4-4-10.4-4-14.4,0c-4,4-4,10.4,0,14.4
                    c3.4,3.4,8.8,3.9,12.7,1.4l4.7,4.7c0.9,0.9,2.2,0.9,3.1,0C29.3,28.8,29.3,27.4,28.4,26.6z M19.7,20.9c-2.5,2.5-6.6,2.5-9.1,0
                    c-2.5-2.5-2.5-6.6,0-9.1c2.5-2.5,6.6-2.5,9.1,0C22.2,14.4,22.2,18.4,19.7,20.9z"/>
                <animateTransform attributeName="transform" type="translate" dur="1s" repeatCount="indefinite" values="3 3;-3 3;0 -2.2;3 3" keyTimes="0;0.33;0.66;1"/>
            </svg>
        
        );
    }
    
    renderSearchButton() {
        
        if ( this.props.isSearching === true ) {
            
            return (
        
                <button id="search-button"
                        className="is-searching"
                        onClick={ this.handleSearch } 
                >
                    { this.renderSearchButtonLoadingIcon() }
                    <span className="search-button-text">Searching...</span>
                </button>
        
            );
            
        }
        else {
            
            return (
            
                <button id="search-button"
                        onClick={ this.handleSearch } 
                >
                    { this.renderSearchButtonStaticIcon() }
                    <span className="search-button-text">Search</span>
                </button>
            )
        }
    }
    
    handleSearch() {

        this.props.onSearch();
    }
    
    renderClearAllFields() {
        
        return <label id="clear-all-fields">Clear All Fields</label>
    }
    
    render() {

        return (
            <div id="search-controls" className="clearfix">
                { /* this.renderClearAllFields() */ }
                { this.renderSearchButton() }
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
                    isSearching={ this.props.isSearching }
                />
            </div>
        )
    }
}

export { SearchTransactionsSection };