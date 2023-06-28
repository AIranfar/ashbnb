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
  // const [signUp, setSignUp] = useState()
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          const errors = Object.values(data.errors)
          return setErrors(errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  // const disabledButton = () => {
  //   if (!email.length || !username.length || !firstName.length || !lastName.length || !password.length || !confirmPassword.length) {
  //     return true;
  //   } else if (username.length < 4 || password.length < 6 || password !== confirmPassword) {
  //     return true;
  //   }
  //   return false;
  // }

  // useEffect(() => {
  //   if (!email.length || !username.length || !firstName.length || !password.length || !confirmPassword.length) {
  //     setSignUp('submit-disabled')
  //   }
  //   else if (username.length < 4 || password.length < 6 || password !== confirmPassword) {
  //     setSignUp('submit-disabled')
  //   } else {
  //     setSignUp('submit-enabled')
  //   }
  // }, [email, username, firstName, lastName, password, confirmPassword])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <div className='signup-outer-container'>
      <h1>Sign Up</h1>
      <form className='signup-inner-container' onSubmit={handleSubmit}>
        <div className='signup-errors'>
          {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            Email
          </label>
          <input
            type="text"
            className='form-input'
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            Username
          </label>
        <input
          type="text"
          className='form-input'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            First Name
          </label>
        <input
          type="text"
          className='form-input'
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            Last Name
          </label>
        <input
          type="text"
          className='form-input'
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            Password
          </label>
        <input
          type="password"
          className='form-input'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="signup-container">
          <label className="signup-label-text">
            Confirm Password
          </label>
        <input
          type="password"
          className='form-input'
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
