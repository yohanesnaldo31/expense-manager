import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';
import { logoutUser } from '../../store/actions/authActions'; 


const navbar = (props) => {
    const onLogoutClick = (event) => {
        event.preventDefault();
        props.logoutUser();
    }
    const unAuthMenu = [
        {
            link: '/register',
            label: 'Register'
        },
        {
            link: '/login',
            label: 'Login'
        }
    ]
    let navMenu = null;
    if(props.auth.isAuthenticated){
        navMenu = 
        <NavItem 
            style={{fontFamily: 'monospace', fontSize:'20px'}}
            onClick={onLogoutClick} 
            className="black-text">
            Logout
        </NavItem>
    }else{
        navMenu = unAuthMenu.map(menu => {
            return <NavItem 
                key={menu.label}
                style={{fontFamily: 'monospace', fontSize:'20px'}}
                href={menu.link}
                className="black-text">
                {menu.label}
            </NavItem>
        })

    }
    const brand=<Link
            to="/"
            style={{
                fontFamily: 'monospace'
            }}
            className="col s12 brand-logo center black-text"
        >
            Biller
        </Link>
    return (
        <Navbar fixed className="blue" brand={brand} centerLogo alignLinks="right">
            
            {navMenu}
        </Navbar>
    //   <div className="navbar-fixed" style={{zIndex: 400}}>
    //       <nav className="z-depth-1">
    //           <div className="nav-wrapper blue valign-wrapper">
                
    //             {logoutButton}
    //           </div>
              
    //       </nav>
    //   </div>  
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(navbar);