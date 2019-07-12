import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
            // date: {
            //     value: '',
            //     type: 'date',
            //     label: 'Date of expense'
            // },
            month: {
                value: 1,
                type: 'select',
                options: [
                    {value: 1, DisplayedValue: 'January'},
                    {value: 2, DisplayedValue: 'February'},
                    {value: 3, DisplayedValue: 'March'},
                    {value: 4, DisplayedValue: 'April'},
                    {value: 5, DisplayedValue: 'May'},
                    {value: 6, DisplayedValue: 'June'},
                    {value: 7, DisplayedValue: 'July'},
                    {value: 8, DisplayedValue: 'August'},
                    {value: 9, DisplayedValue: 'September'},
                    {value: 10, DisplayedValue: 'October'},
                    {value: 11, DisplayedValue: 'November'},
                    {value: 12, DisplayedValue: 'December'}
                ],
                label: 'Select Month'
            },
            year: {
                value: 2019,
                type: 'select',
                options: [
                    {value: 2019, DisplayedValue: '2019'},
                    {value: 2020, DisplayedValue: '2020'},
                    {value: 2021, DisplayedValue: '2021'},
                    {value: 2022, DisplayedValue: '2022'},
                    {value: 2023, DisplayedValue: '2023'}
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
            if(!event.target.validity.valid && event.target.value !== ''){
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
        const expense = {
            
            ownerId: this.state.ownerId,
            description: this.state.formAdd.description.value,
            value: this.state.formAdd.value.value,
            month: this.state.formAdd.month.value,
            year: this.state.formAdd.year.value      
        }
        axios.post('/api/expenses/insert', expense)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.setState({
            modalIsOpen: false
        })
        this.props.history.push('/home');
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

export default connect(mapStateToProps)(withRouter(AddExpense));