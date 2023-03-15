import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
        <NavLink className='logo' exact to='/'>ashbnb</NavLink>
      {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
      <NavLink to='/spots/new'>Create a New Spot</NavLink>
    </ul>
  );
}

export default Navigation;
