import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1 id='signup-page-title'>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <div id='signup-form-container'>
        <form onSubmit={handleSubmit} id="signup-form">
            <input
              type="text"
              value={email}
              placeholder='Email'
              id='email-field'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          {errors.email && <p>{errors.email}</p>}
            <input
              type="password"
              value={password}
              id='password-field'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {errors.password && <p>{errors.password}</p>}
            <input
              type="password"
              value={confirmPassword}
              id='password-field'
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button id='signup-form-button' type="submit">Sign Up</button>
          <NavLink id='navlink' to='/login'> {"Already have an account?"} <br /> {"Sign in here!"}
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;
