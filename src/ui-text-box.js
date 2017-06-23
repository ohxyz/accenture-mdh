import React from 'react';
import validator from 'validator';

const UTILS = require( './utils.js' );

const RULE_EMPTY = '';
const RULE_NUMERIC = 'numeric';
const RULE_ALPHANUMERIC_UNDERSCORE_DASH = 'alphanumeric-underscore-dash';
const RULE_POSITIVE_INTEGER = 'positive-integer';

class TextBox extends React.Component {
    
    constructor( props ) {
        
        super( props );
        
        this.handleFocus = this.handleFocus.bind( this );
        this.handleTyping = this.handleTyping.bind( this );
        this.handleTextBoxClick = this.handleTextBoxClick.bind( this );
        this.handleBlur = this.handleBlur.bind( this );
        
        this.className = '';
        this.textBoxTitleElement = null;
        this.isFocused = false;
        this.inputBox = null;

        // Not UUID
        let randomString = Math.random().toString(36).slice(2);
        
        this.id = UTILS.setDefault( props.id, randomString );
        this.name = UTILS.setDefault( props.name, randomString );
        this.title = UTILS.setDefault( props.title, 'Fill in here' );
        this.inputValue = UTILS.setDefault( props.value, '' );
                
        this.isInputValueValid = true;
        this.allowEmpty = true;
        this.firstTimeFocused = true;
        this.isErrorMessageDefined = false;
        
        if ( props.error === undefined ) {
            
            this.errorMessage = 'Error !';
            this.isErrorMessageDefined = false;
        }
        else {
            
            this.errorMessage = props.error;
            this.isErrorMessageDefined = true;
        }
        
        this.requireValidation = props.rule === undefined
            ? false
            : true;
        
        this.validationRule = null;

        if ( this.requireValidation === true ) {
            
            let rule = {
            
                name: UTILS.setDefault( props.rule.name, RULE_EMPTY ),
                minLength: UTILS.setDefault( props.rule.min, null ),
                maxLength: UTILS.setDefault( props.rule.max, null )
            };
            
            this.validationRule = rule;
        }

        this.makeClassName();

        this.state = {
            
            isFocused: this.isFocused,
            value: this.inputValue
        };
    }
    
    validateInputValue() {
        
        let rule = this.validationRule.name;
        
        if ( this.allowEmpty === true && this.inputValue === '' ) {
            
            this.isInputValueValid = true;
        }
        else if ( rule === RULE_EMPTY ) {
            
            this.isInputValueValid = true;
        }
        else if ( rule === RULE_POSITIVE_INTEGER ) {
            
            this.validatePositiveInteger();
        }
        else if ( rule === RULE_NUMERIC ) {
            
            this.validateNumeric();
        }
        else if ( rule === RULE_ALPHANUMERIC_UNDERSCORE_DASH ) {

            this.validateAlphanumericUnderscoreDash();
        }

    }
    
    validateNumeric() {
        
        let rule = this.validationRule;

        let isValid = validator.isNumeric( this.inputValue );

        if ( isValid === true ) {
            
            isValid = ( rule.minLength !== null && this.inputValue.length >= rule.minLength );
        }

        if ( isValid === true ) {
            
            isValid = ( rule.maxLength !== null && this.inputValue.length <= rule.maxLength );
        }

        if ( isValid === true ) {
            
            this.isInputValueValid = true;
        }
        else {
            
            this.isInputValueValid = false;

            let lengthLiteral = ( rule.minLength !== null && rule.minLength === rule.maxLength )
                ? rule.minLength.toString()
                : rule.minLength + ' to ' + rule.maxLength;
        
            this.errorMessage = this.isErrorMessageDefined === true
                ? this.errorMessage
                : lengthLiteral + ' digits required.';
        }
    }

    
    validatePositiveInteger() {
        
        let isInteger = validator.isInt( this.inputValue, { min: 0 } )
        
        if ( isInteger === true
                && parseInt( this.inputValue, 10 ) > 0 )
        {
            this.isInputValueValid = true;
        }
        else {
            
            this.isInputValueValid = false;
            this.errorMessage = this.isErrorMessageDefined === true
                ? this.errorMessage
                : 'Positive number required.';
        }
    }
    
    validateAlphanumericUnderscoreDash() {
        
        
    }

    handleFocus( event ) {
        
        let input = event.target;
        
        if ( input.value === this.props.value ) {
             input.value = '';
        }
        
    }

    handleBlur() {
        console.log( 'blurred' );
        this.isFocused = false;
        this.firstTimeFocused = false;
        
        if ( this.requireValidation === true ) {
            
            this.validateInputValue();
        }
        
        
        
        this.makeClassName();
        
        this.setState( {
            
            isFocused: false
            
        } ); 
    }
    
    handleTyping( ) {
        
        this.inputValue = this.inputBox.value;
        
        if ( this.requireValidation === true 
                && this.firstTimeFocused === false ) 
        {
            this.validateInputValue();
        }

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
        
        if ( this.isInputValueValid === false ) {
            
            this.className += ' is-invalid';
        }
    }
    
    handleTextBoxClick( event ) {
        
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
    
    renderErrorMessageIfInvalid() {
        
        if ( this.isInputValueValid === false ) {

            return (
            
                <span className="text-box-error-message">
                    { this.errorMessage }
                </span>
            )
        }
        
        return '';
    }

    render() {
        
        let inputBoxId = this.id + '-input-text';
        
        return (
            <div className={ this.className } 
                 onClick={ this.handleTextBoxClick }
            >
                <label htmlFor={ inputBoxId } 
                       className="text-box-title"
                       ref={ elem => this.textBoxTitleElement = elem }
                >
                    <span>{ this.title }</span>
                    { this.renderErrorMessageIfInvalid() }
                </label>
                
                <input id={ inputBoxId }
                       type="text"
                       className="text-box-filled"
                       name={ this.name }
                       defaultValue={ this.inputValue }
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