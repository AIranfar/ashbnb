import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <div className='test'>
      <img src='https://cdn.dribbble.com/users/2280052/screenshots/5337647/media/96b909cc031e4a49d2ae4692717b3320.png?compress=1&resize=400x300' alt='ash-picture' className='ash-pic' />
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
