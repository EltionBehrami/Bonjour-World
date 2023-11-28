import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { closeModal } from "../../../store/modal";
import { signup, clearSessionErrors } from '../../../store/session';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'passwordConfirmation':
        setState = setPasswordConfirmation;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    const res = await dispatch(signup(user)); 
    if (res.ok) {
      dispatch(closeModal())
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>


      <div className='inputs'>
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email</span>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
          <span>Username</span>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password</span>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="errors">
          {password !== passwordConfirmation && 'Confirm Password field must match'}
        </div>
        <label>
          <span>Confirm Password</span>
          <input type="password"
            value={passwordConfirmation}
            onChange={update('passwordConfirmation')}
            placeholder="Confirm Password"
          />
        </label>
      </div>
  
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== passwordConfirmation}
      />
    </form>
  );
}

export default SignupForm;