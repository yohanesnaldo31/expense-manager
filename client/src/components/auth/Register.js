import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from '../UI/AuthInput';

class Register extends Component{
    state = {
        registerForm: {
            username: {
                value: '',
                type: 'text',
                label: 'Username'
            },
            email: {
                value: '',
                type: 'email',
                label: 'Email'
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password'
            },
            password2: {
                value: '',
                type: 'password',
                label: 'Confirm Password'
            }
        },
        errors: {}
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegisterForm={
            ...this.state.registerForm
        }
        const updatedFormElement={
            ...updatedRegisterForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedRegisterForm[inputIdentifier] = updatedFormElement;

        this.setState({
            registerForm: updatedRegisterForm    
        });
    }

    registerHandler = (event) => {
        event.preventDefault();
        const newUser = {
            username: this.state.registerForm.username.value,
            email: this.state.registerForm.email.value,
            password: this.state.registerForm.password.value,
            password2: this.state.registerForm.password2.value
        }
        console.log(newUser);
    }


    render(){
        const formElementsArray = [];
        for(let key in this.state.registerForm){
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            })
        }
        const errors = this.state.errors;
        const form = (
            <form noValidate onSubmit={this.registerHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            value={formElement.config.value}
                            type={formElement.config.type}
                            name={formElement.id}
                            label={formElement.config.label}
                            error={errors[formElement.id]}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))
                }
                <div className="col s12 m4" style={{ paddingLeft: "11.250px" }}>
                    <button
                        style={{
                            width: "100%",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="col s12 btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Sign Up
                    </button>
                </div>
            </form>
                            
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <Link
                            to="/"
                            className="btn-flat waves-effect"
                        >
                            <i className="material-icons left">keyboard_backspace</i>
                             Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p>
                                Already have an account? <Link to='/login'>Log in</Link>
                            </p>
                        </div>
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;