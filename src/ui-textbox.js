import React from 'react';

class TextBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        
        this.handleFocus = this.handleFocus.bind( this );
        this.handleTyping = this.handleTyping.bind( this );
        this.handleClick = this.handleClick.bind( this );
        this.handleBlur = this.handleBlur.bind( this );
        
        this.className = '';
        this.textBoxTitleElement = null;
        this.isFocused = false;
        this.inputBox = null;
        this.inputValue = '';
        
        // Not UUID
        let randomString = Math.random().toString(36).slice(2);
        
        
        this.id = props.id === undefined
            ? randomString
            : props.id;
        
        this.name = props.name === undefined
            ? randomString
            : props.name;
            
        this.title = props.title === undefined
            ? 'Fill in here'
            : props.title

        this.inputValue = props.value === undefined
            ? ''
            : props.value;
            
        this.makeClassName();

        this.state = {
            
            isFocused: this.isFocused,
            value: this.inputValue
        };
    }
    
    handleFocus( event ) {
        
        let input = event.target;
        
        if ( input.value === this.props.value ) {
             input.value = '';
        }
        
    }

    handleBlur() {
        console.log( 'blurred' )
        this.isFocused = false;
        this.makeClassName();
        
        this.setState( {
            
            isFocused: false
        } ); 
    }
    
    handleTyping( ) {
        
        this.inputValue = this.inputBox.value;

        this.makeClassName();
        
        if ( this.props.onChange !== undefined ) {
            
            this.props.onChange( this.inputBox );
        }
        
        this.setState( {
            
            value: this.inputValue
            
        } );
    }
    
    makeClassName() {
        
        this.className = 'text-box';
        
        if ( this.isFocused === true ) {
            
            this.className += ' is-focused';
        }

        if ( this.inputValue !== '' ) {
            
            this.className += ' is-filled';
        }
        
    }
    
    handleClick( event ) {
        
        let target = event.target;
        
        if ( target === this.textBoxTitleElement ) {
            
            return ;
        }
        
        if ( this.isFocused === false ) {
            
            this.isFocused = true;
        }

        this.makeClassName();

        this.setState( { 
        
            isFocused: this.isFocused
            
        } );
        
    }

    render() {
        
        let inputBoxId = this.id + '-input-text';
        
        return (
            <div className={ this.className } 
                 onClick={ this.handleClick }
            >
                <label htmlFor={ inputBoxId } 
                       className="text-box-title"
                       ref={ elem => this.textBoxTitleElement = elem }
                >
                    { this.title }
                </label>
                <input id={ inputBoxId }
                       type="text"
                       className="text-box-filled"
                       name={ this.name }
                       defaultValue=""
                       onFocus={ this.handleFocus }
                       onBlur={ this.handleBlur }
                       onChange={ this.handleTyping }
                       ref={ elem => this.inputBox = elem }
                />
            </div>
        );
    }
    
    componentDidUpdate() {
    
        if ( this.isFocused === true ) {
            
            this.inputBox.focus();
        }
    }
}

export { TextBox };