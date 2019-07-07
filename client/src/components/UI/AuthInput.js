import React from 'react';

const AuthInput = (props) => {
    return (
        <div className="input-field col s12">
            <input 
                value={props.value}
                error={props.error}
                name={props.name}
                type={props.type}
                onChange={props.changed}
            />
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

export default AuthInput;