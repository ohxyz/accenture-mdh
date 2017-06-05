import React from 'react';
import ReactDOM from 'react-dom';
import { LatestTransactions } from './latest-transactions';
import { TextBox, DropdownBox, DropdownBoxGroup } from './ui-components';
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
            
            {        
                type: 'multiple',
                id: 'transaction-status',
                name: 'Transaction Status',
                listItems: listItems
            },
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
                            listItems={ listItems }
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
							id="service-order-type"
							name="Service Order Type"
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
                <button id="search-button">Search</button>
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
            console.log('f',this.state.enableAdvancedSearch )
            
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
                    toggleSearchModeClick={ this.toggleSearchModeClick } 
                    toggleSearchModeText={ this.state.toggleSearchModeText }
                />
            </div>
        )
    }
}

ReactDOM.render(
    <SearchTransactionsSection />,
    document.getElementById( 'search-transactions-section' )
);

ReactDOM.render(
    
    <LatestTransactions />,
    document.getElementById( 'latest-transactions-section' )
);

