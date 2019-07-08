import React from 'react';
import classnames from 'classnames';

const AuthInput = (props) => {
    return (
        <div className="input-field col s12">
            <input 
                value={props.value}
                error={props.error}
                name={props.name}
                type={props.type}
                onChange={props.changed}
                className={classnames('', {
                    invalid: props.error
                })}
            />
            <label htmlFor={props.name}>{props.label}</label>
            <span className="red-text">{props.error}</span>
        </div>
    )
}

export default AuthInput;