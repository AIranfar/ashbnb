import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-user-circle" />
        <i className='fa-solid fa-bars-staggered' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='profile-container'>
              <ul className='hello-first-name'>Hello, {user.firstName}</ul>
              <ul className='user-email'>{user.email}</ul>
              <NavLink to='/spots/current' className='manage-spots'>Manage Spots</NavLink>
              <button className='logout-button' onClick={logout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className='login-signup-container'>
              <OpenModalButton
                className='profile-login-button'
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
              <OpenModalButton
                buttonText="Sign Up"
                className='sign-up-login-button'
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
