import React from 'react';
import MediaQuery from 'react-responsive';
import '../styles/header.css';

const Header = () => {
    return (
        <div className="view_option" className="background">

            <span>Plandars</span>

            <span className="view_option">
                <a>WEEK</a> / <a>MONTH</a>
            </span>

            <a className="float_right"><i class="fas fa-sign-out-alt"></i></a>
            <a className="float_right"><i class="fas fa-cog"></i></a>
        </div>
    );
};

export default Header;