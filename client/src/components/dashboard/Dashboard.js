import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';



const Dashboard = (props) => {
    const onLogoutClick = (event) => {
        event.preventDefault();
        props.logoutUser();
    }
    const { user } = props.auth;
    console.log(user);
    return (
        <div className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                    {user.username.split(" ")[0]}
                    </h4>
                    <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth   
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);