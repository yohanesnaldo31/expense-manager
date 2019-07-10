import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Aux from '../../../hoc/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input';

class AddExpense extends Component {
    state = {
        ownerId: '',
        formAdd: {
            description: {
                value: '',
                type: 'text',
                label: 'Description'
            },
            value: {
                value: '',
                type: 'number',
                label: 'Value'
            },
            month: {
                value: 'January',
                type: 'select',
                options: [
                    {value: 'January'},
                    {value: 'February'},
                    {value: 'March'},
                    {value: 'April'},
                    {value: 'May'},
                    {value: 'June'},
                    {value: 'July'},
                    {value: 'August'},
                    {value: 'September'},
                    {value: 'October'},
                    {value: 'November'},
                    {value: 'December'}
                ],
                label: 'Select Month'
            },
            year: {
                value: '2019',
                type: 'select',
                options: [
                    {value: '2019'},
                    {value: '2020'},
                    {value: '2021'},
                    {value: '2022'},
                    {value: '2023'}
                ],
                label: 'Select Year'
            }
        },
        errors: {},
        modalIsOpen: false
    }

    componentDidMount(){
       
        this.setState({
            ownerId: this.props.user.id
        })
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
      }

    onChangeHandler = (event, inputIdentifier) => {
        if(inputIdentifier==='value'){
            if(!event.target.validity.valid && event.target.value != ''){
                return;
            }
        }
        const updatedFormAdd={
            ...this.state.formAdd
        }
        const updatedFormElement={
            ...updatedFormAdd[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormAdd[inputIdentifier] = updatedFormElement;

        this.setState({
            formAdd: updatedFormAdd    
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            modalIsOpen: false
        })
    }

    render(){
        const errors = this.state.errors;
        const formElementsArray = [];
        for(let key in this.state.formAdd){
            formElementsArray.push({
                id: key,
                config: this.state.formAdd[key]
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
                        options={formElement.config.options ? formElement.config.options : {}}
                        changed={(event) => this.onChangeHandler(event, formElement.id)}
                    />)
                })}
                <div className="col s12 m4 offset-m8" style={{ paddingLeft: "11.250px" }}>
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
                        Add
                    </button>
                </div>
            </form>
        )

        return(
            <Aux>
                <button 
                    style={{float: 'right'}}
                    onClick={this.openModal}
                    className="btn btn-small waves-effect waves-light hoverable blue "
                >
                    <i className="material-icons left">add</i>Expense
                </button>
                <Modal
                    show={this.state.modalIsOpen}
                    modalClosed={this.closeModal}
                >
                    <div className="center-align">
                        <h4>Add Expense</h4>
                    </div>
                    <div>
                        {form}
                    </div>
                    
                </Modal>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(AddExpense);