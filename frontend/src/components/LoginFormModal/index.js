import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/')
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          const errors = Object.values(data.errors)
          return setErrors(errors)
        }
        );
  };


  const disabledButton = () => {
    if (!credential.length || !password.length) {
      return true;
    } else if (credential.length < 4 || password.length < 6) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!credential.length || !password.length) {
      setLogin('login-disabled')
    }
    else if (credential.length < 4 || password.length < 6) {
      setLogin('login-disabled')
    } else {
      setLogin('login-enabled')
    }
  }, [credential, password])

  const demoUserButton = (e) => {
    setCredential('Demo-lition');
    setPassword('password');
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
        }
      )
  }

  return (
    <div className='login-outer-container'>
      <h1 className='login'>Log In</h1>
      <form className='login-inner-container' onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          className='login-form-input'
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className='login-form-input'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className='login-modal-button' id={login} type="submit" disabled={disabledButton()}>Log In</button>
        <button onClick={demoUserButton} className='demo-user-button'>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
