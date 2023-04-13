import React from 'react';
import s from './index.module.sass';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthUser";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleLogOut = () => {
    auth.logOut()
    navigate('/signIn')
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.leftToolBar}>
          <Link to={'/'} className={s.logo}>Logo</Link>
          <div className={s.menu}>
            <Link to={'/'}>Home</Link>
          </div>
        </div>
        <div className={s.rightToolBar}>
          {auth.currentUser ?
            (
              <>
                <Link to={'/profile'}>{auth.currentUser ? `${auth.currentUser.firstName} ${auth.currentUser.lastName}`: 'Profile'}</Link>
                <button onClick={handleLogOut}>Logout</button>
              </>
            )
            :
            (
              <>
                <Link to={'/signUp'}>Sign Up</Link>
                <Link to={'/signIn'}>Sign In</Link>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;