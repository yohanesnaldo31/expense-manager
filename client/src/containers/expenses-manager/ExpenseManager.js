import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card } from 'react-materialize';

import Spinner from '../../components/UI/Spinner/Spinner';
import AddExpense from './CRUD/AddExpense';


class Dashboard extends Component {
    state = {
        data: [],
        hasLoaded: false
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('./login');
        }
        axios.get('/api/expenses/getAll')
            .then(res => {
                let hasLoadedUpdate = false;
                if(res.data.length > 0){
                    hasLoadedUpdate = true;
                }
                this.setState({
                    data: res.data,
                    hasLoaded: hasLoadedUpdate
                })
            })
            .catch(err => console.log(err));
      
    }
    componentWillReceiveProps(){
        axios.get('/api/expenses/getAll')
            .then(res => { 
                this.setState({
                    data: res.data,
                    hasLoaded: true
                })
            })
            .catch(err => console.log(err));
    }
    onLogoutClick = (event) => {
        event.preventDefault();
        this.props.logoutUser();
    }

    getMonthsName = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month-1];
    }

    render(){
        let table = null;
        const sortedExpenseData = this.state.data.sort((a,b) => {
            if(a.year===b.year){
                return (a.month < b.month) ? -1 : (a.month > b.month) ? 1 : 0
            }
            else{
                return (a.year < b.year) ? -1 : 1;
            }
        })
        if(this.state.hasLoaded === false){
            table= <Spinner />
        }
        if(sortedExpenseData.length > 0 && this.state.hasLoaded === true){
            table= 
            <Card style={{marginTop: '20px'}}>
                <table
                    className=" highlight striped centered"
                    style={{overflowX:'auto'}}
                >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Value</th>
                            <th>Month</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedExpenseData.map(expense => {
                            return (
                                <tr key={expense._id}>
                                    <td>
                                        {expense.description}
                                    </td>
                                    <td>
                                        {expense.value}
                                    </td>
                                    <td>
                                        {this.getMonthsName(expense.month)}
                                    </td>
                                    <td>
                                        {expense.year}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
            
            
        }
        return (
            <div className="container">
                
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            {this.props.auth.user.username} Expenses
                        </h4>
                    </div>
                    
                    <div className="col s12" style={{marginTop: '30px'}}>
                        <AddExpense />
                    </div>
                    <div className="col s12" style={{marginTop: '10px'}}>
                        {table}
                    </div>
                
                </div>
            </div>
        )
   }
    
    
}

const mapStateToProps = (state) => ({
    auth: state.auth   
})

export default connect(mapStateToProps)(Dashboard);