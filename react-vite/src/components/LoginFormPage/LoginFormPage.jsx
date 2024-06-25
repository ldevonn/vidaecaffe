import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useFormik} from "formik"
import * as Yup from 'yup'
import "./LoginForm.css";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email must be provided"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password must be provided"),
})

function LoginFormPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


  const {handleSubmit,
      handleChange,
      values,
      errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const serverResponse = await dispatch(thunkLogin(values));
      if (!serverResponse) {
        navigate("/")
      }
    }
  })

    const handleDemoAdmin = async () => {
      await dispatch(thunkLogin({ email: "demo@gmail.com", password: "password" }));
    }

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1 id='login-page-title'>Log In</h1>
      <div id='login-form-container'>
        <form onSubmit={handleSubmit} id="login-form">
              <input
                type="text"
                name="email"
                id='email-login-field'
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            <p id='errors'> {errors.email} </p>
              <input
                type="password"
                name="password"
                id='password-login-field'
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <p id='errors'> {errors.password}</p>
            <button id='login-form-button' type="submit">Sign In</button>
            <button id='login-form-button' onClick={() => handleDemoAdmin()}>Demo Admin</button>
          <NavLink id='navlink' to='/signup'> {"Don't have an account?"} <br /> {"Sign up and earn points on your next order!"}
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
