import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';
import Axios from 'axios';

import AddExpense from './CRUD/AddExpense';


class Dashboard extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        const user = this.props.auth.user;
        console.log(user);
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('./login');
        }
        
    }
    onLogoutClick = (event) => {
        event.preventDefault();
        this.props.logoutUser();
    }

    render(){
        return (
            <div className="container">
                
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            {this.props.auth.user.username} Expenses
                        </h4>
                    </div>
                    <div className="col s12" style={{marginTop: '10px'}}>
                        <AddExpense />
                    </div>
                    <div className="col s12 center-align">
                        
                        
                        <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Logout
                        </button>
                    </div>
                </div>
            </div>
        )
   }
    
    
}

const mapStateToProps = (state) => ({
    auth: state.auth   
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);