import React from 'react';

class CheckBox extends React.Component {
    
    render() {
        
        let defaultValue = this.props.defaultValue === undefined
            ? false
            : this.props.defaultValue;

        return (
        
            <div className="check-box"
                 id={ this.props.id }
                 data-name={ this.props.name }
                 data-default-value={ defaultValue }
            >
            { this.props.name }
            </div>
        )
    }
}

export { CheckBox };
