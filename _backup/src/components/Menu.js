import React from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Login</NavLink></li>
                <li><NavLink exact to="/home" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
            </ul>
            <hr/>


            <br/>
            
            <MediaQuery minWidth={1024}>
                PC
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={1023}>
                tablet
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                mobile
            </MediaQuery>

        </div>
    );
};

export default Menu;