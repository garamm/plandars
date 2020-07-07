import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div className="left">
          <span>Plandars</span>
          <a className="floatRight">Setting</a>
        </div>
        
      </div>
    );
  }
}

export default Header;