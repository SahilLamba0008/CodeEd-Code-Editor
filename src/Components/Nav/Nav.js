import React from 'react';
import './Nav.css';

const Nav = ({userName}) => {
  return (
    <div>
      <header className='nav-header'>
        <div className="header-left cur-po">
          <p>CodeEd.</p>
        </div>
        { userName !== "" ? (
        <div className="header-right">
          <p className="user-name">{userName}</p>
          <img src="/images/user.webp" alt="user" className='user-img cur-po' />
        </div>
        ) : (<></>)
        }
      </header>
    </div>
  );
}

export default Nav;