/* Global configuration */

const GLOBAL = {
    
    enableAdvancedSearch: true,
    showSearchResults: true
};

const DEMO = {
    
    cascadedData: {
            
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
    },
                    
    transactionCategory: {
            
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
    },
    
    listItems: [ 'Basic One', 'Basic Two', 'Basic Three' ],
    
    attrsOfDropdownBoxes: [
    
        {
            type: 'multiple',
            id: 'transaction-group',
            name: 'transaction-group',
            title: 'Transaction Group',
            listItems: this.listItems
        },
        
        
        {        
            type: 'multiple',
            id: 'transaction-type',
            name: 'transaction-type',
            title: 'Transaction Type',
            listItems: this.listItems
        },
    ],
    
    sendingParticipants: [ 'Multinet', 'ORIGINUSR', 'Australian Energy Market Operator', 'Origin', 'Jemena' ],
    
    receivingParticipants: [ 'Envestra', 'Origin', 'Central Ranges (Tamworth)' ],
    
    serviceOrderType: [ 'Service Connection Request', 'Unknown Type' ],
    
    serviceOrderSubtype: [ 'Subtype 1', 'Subtype B', 'Subtype III' ]
    
};

const LOCAL_DATA = DEMO;

export { GLOBAL, LOCAL_DATA };