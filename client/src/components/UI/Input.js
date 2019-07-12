import React from 'react';
import classnames from 'classnames';
import {Select} from 'react-materialize'

const Input = (props) => {
    let InputElement = null;
    switch(props.type){
        case 'text': 
        case 'email': 
        case 'password':
            InputElement = <div className="input-field col s12">
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
            break;
        case 'number' :
            InputElement = <div className="input-field col s12">
                <input 
                    value={props.value}
                    error={props.error}
                    name={props.name}
                    type='text'
                    inputMode="numeric"
                    pattern="[0-9.]*"
                    onChange={props.changed}
                    className={classnames('', {
                        invalid: props.error
                    })}
                />
                <label htmlFor={props.name}>{props.label}</label>
                <span className="red-text">{props.error}</span>
            </div>
            break;
        case 'select':
            InputElement = 
                <Select 
                    s={12}
                    label={props.label}
                    name={props.name} 
                    onChange={props.changed} 
                >
                    {Object.keys(props.options)
                        .map(id => {
                            return (
                                <option 
                                    alignment={'right'}
                                    key={props.options[id].value}
                                    value={props.options[id].value}>
                                    {props.options[id].DisplayedValue}
                                </option>)
                        })}

                </Select>               
            break;
        default: InputElement=null;
    }

    return InputElement
}

export default Input;