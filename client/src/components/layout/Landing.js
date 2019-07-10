import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = (props) => {
    if(props.auth.isAuthenticated){
        props.history.push('/home');
    }
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                
                <div className="col s12 center-align">
                    <h4>
                        <span style={{ fontFamily: "monospace" }}><b>Biller</b></span>:
                         Expense Manager 
                    </h4>
                    <p>
                        Your solution in managing your expenses
                    </p>
                    <br/>
                    <div className="col s6">
                        <Link
                            to="/register"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Register
                        </Link>
                    </div>
                    <div className="col s6">
                        <Link
                            to="/login"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable white accent-3 black-text"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);
 