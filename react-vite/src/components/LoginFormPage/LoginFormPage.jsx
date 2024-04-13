import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import * as Yup from 'yup'
import "./LoginForm.css";

const validationSchema = Yup.object({
  email: Yup.string()
      .email("Invalid email format")
      .required("Email must be provided"),
  password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password must be provided")
})

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const {handleSubmit, handleChange, values, errors, touched} = useFormik({
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

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
