import React from 'react';

const UTILS = require( './utils.js' );

class MessageBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        
        this.handleClick = this.handleClick.bind( this );
        
        this.title = UTILS.setDefault( props.title, 'Message Title' );
        this.subtitle = UTILS.setDefault( props.subtitle, 'Message Subtitle' );
        this.content = UTILS.setDefault( props.content, 'Message Content' );
        this.type = UTILS.setDefault( props.type, '' );
        this.className = 'message-box';
        this.isClosed = false;
        
        this.state = {
            
            isClosed: this.isClosed
        };
        
    }
    
    makeClassName() {
        
        this.className = 'message-box';
        
        let typeLiteral = this.className + '-' + this.type;
        
        this.className += ' ' + typeLiteral;
    }
    
    handleClick() {
        
        this.isClosed = true;
        
        this.setState( {
            
            isClosed: this.isClosed
            
        } );
    }
    
    renderCloseIcon() {
        
        return (
            
            <svg className="svg-message-box-close-icon" 
                 viewBox="0 0 34 36.5"
                 onClick={ this.handleClick }
            >
                <path d="M17,6.6c-6.4,0-11.7,5.2-11.7,11.7c0,6.4,5.2,11.7,11.7,11.7c6.4,0,11.7-5.2,11.7-11.7
                    C28.7,11.8,23.4,6.6,17,6.6z M22.1,22.3l-1.3,1.4L17,19.6l-3.9,4l-1.3-1.3l3.9-4l-3.8-4l1.3-1.4l3.8,4.1l3.9-4l1.3,1.3l-3.9,4
                    L22.1,22.3z"/>
            </svg>
        
        );
    }
    
    render() {
        
        if ( this.isClosed === true ) {
            
            return null;
        }
        
        this.makeClassName();
        
        return (
        
            <div className={ this.className } >
                <div className="message-box-header">
                    { this.renderCloseIcon() }
                    <div className="message-box-title">
                        { this.title }
                    </div>
                    <div className="message-box-subtitle">
                        { this.subtitle }
                    </div>
                </div>
                <div className="message-box-content">
                    { this.content }
                </div>
            </div>
        
        )
        
    }
}

export { MessageBox };