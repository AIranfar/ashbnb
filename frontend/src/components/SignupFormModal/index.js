import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  useEffect(() => {
    let errors = [];

    if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
      errors.push('All fields required')
    }
    if (username.length < 4) {
      errors.push('Username must be at least 4 characters')
    }
    if (password.length < 6) {
      errors.push('Password must be longer than 6 characters')
    }
    setErrors(errors)
  }, [email, username, firstName, lastName, password, confirmPassword])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <div className='signup-outer-container'>
      <h1>Sign Up</h1>
      <form className='signup-inner-container' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
        </ul>
        <input
          type="text"
          className='form-input-width'
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className='form-input-width'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          className='form-input-width'
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className='form-input-width'
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="password"
          className='form-input-width'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className='form-input-width'
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button id='button' type="submit" disabled={errors.length ? true : false}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
