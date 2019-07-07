import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
      <div className="navbar-fixed">
          <nav className="z-depth-1">
              <div className="nav-wrapper blue">
                <Link
                    to="/"
                    style={{
                        fontFamily: 'monospace'
                    }}
                    className="col s12 brand-logo center black-text"
                >
                    Biller
                </Link>
              </div>
          </nav>
      </div>  
    );
}

export default Navbar;