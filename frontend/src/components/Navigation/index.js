import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-dropdown">
        <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
        <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
      </div>
    );
  }

  return (
    <ul className='nav-bar'>
      <div className='test'>
        <NavLink exact to='/'>
          <img src='/images/fancy-a.png' alt='fancy-a' className='fancy-a-pic' />
        </NavLink>
        <NavLink className='logo' exact to='/'>ashbnb</NavLink>
      </div>
      <div className='create'>
        {sessionUser ? <NavLink className='create-button' to='/spots/new'>Create a New Spot</NavLink> : null}
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </ul>
  );
}

export default Navigation;
