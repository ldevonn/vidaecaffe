import { useDispatch, useSelector } from "react-redux";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import {useFormik} from "formik";
import * as Yup from "yup";
import './SignupForm.css'

const validationSchema = Yup.object({
    username: Yup.string()
        .required("Name must be provided"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email must be provided"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password must be provided"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(8, "Password must be at least 8 characters long")
        .required("Password must be provided"),
})

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const {handleSubmit,
      handleChange,
      values,
      errors
  } = useFormik({
      initialValues: {
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
      },
      validationSchema,
      onSubmit: async (values) => {

          const serverResponse = await dispatch(
              thunkSignup({
                  username: values.username,
                  email: values.email,
                  password: values.password,
              })
          );
          if (!serverResponse) {
              navigate("/")
          }
      }
  });

  return (
    <>
      <h1 id='signup-page-title'>Sign Up</h1>
      <div id='signup-form-container'>
        <form onSubmit={handleSubmit} id="signup-form">
            <input
              type="text"
              name='username'
              value={values.username}
              placeholder='Username'
              id='username-field'
              onChange={handleChange}
              required
            />
          <p id='errors'> {errors.username}</p>
            <input
              type="text"
              name='email'
              value={values.email}
              placeholder='Email'
              id='email-field'
              onChange={handleChange}
              required
            />
          <p id='errors'>{errors.email}</p>

            <input
              type="password"
              name='password'
              value={values.password}
              id='password-field'
              placeholder='Password'
              onChange={handleChange}
              required
            />
          <p id='errors'>{errors.password}</p>
            <input
              type="password"
              name='confirmPassword'
              value={values.confirmPassword}
              id='password-field'
              placeholder='Confirm Password'
              onChange={handleChange}
              required
            />
          <p id='errors'>{errors.confirmPassword}</p>
          <button id='signup-form-button' type="submit">Sign Up</button>
          <NavLink id='navlink' to='/login'> {"Already have an account?"} <br /> {"Sign in here!"}
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;
