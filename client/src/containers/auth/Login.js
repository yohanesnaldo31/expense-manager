import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginUser} from '../../store/actions/authActions';
import Input from '../../components/UI/Input';

class Login extends Component{

    state = {
        formLogin: {
            email: {
                value: '',
                type: 'email',
                label: 'Email'
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password'
            }
        },
        errors: {}
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('props change')
        //redirect if login success
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/home')
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedFormLogin = { ...this.state.formLogin };
        const updatedFormLoginElement = {...updatedFormLogin[inputIdentifier] };
        updatedFormLoginElement.value = event.target.value;
        updatedFormLogin[inputIdentifier] = updatedFormLoginElement;
        this.setState({
            formLogin: updatedFormLogin
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.formLogin.email.value,
            password: this.state.formLogin.password.value
        }
        this.props.loginUser(userData);
    }

    render(){
        const errors = this.state.errors;
        const formElementsArray = [];
        for(let key in this.state.formLogin){
            formElementsArray.push({
                id: key,
                config: this.state.formLogin[key]
            })
        }

        const form = (
            <form noValidate onSubmit={(event) => this.onSubmit(event)}>
                {formElementsArray.map(formElement => {
                    return (<Input 
                        key={formElement.id}
                        value={formElement.config.value}
                        name={formElement.id}
                        type={formElement.config.type}
                        label={formElement.config.label}
                        error={errors[formElement.id]}
                        changed={(event) => this.onChangeHandler(event, formElement.id)}
                    />)
                })}

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
                        Log in
                    </button>
                </div>
            </form>
        )


        return (
            <div className="container">
                <div style={{marginTop: "2rem"}} className="row">
                    <div className="col s12 m8 offset-m2">
                        <Link
                            to="/"
                            className="btn-flat waves-effect"
                        >
                            <i className="material-icons left">keyboard_backspace</i>
                             Back to home
                        </Link>
                        <div className="col s12" style={{paddingLeft: '11px'}}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p>
                                Don't have an account? 
                                <Link to="/register"> Sign up</Link>
                            </p>
                        </div>
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);