import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
import { login } from "../redux/actions/authAction";
import { useDispatch,useSelector } from "react-redux";
import "./Login.css";
const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const {auth}=useSelector(state=>state)
  const history=useHistory()
  const dispatch = useDispatch();
   useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(login(userData));
  };
  const [typePass, setTypePass] = useState(false);
  return (
    <div className="auth__page">
      <div className="login">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2 className="text-uppercase text-center mb4">Naw-Social</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              الأدريسة
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              name="email"
            />
            <div id="emailHelp" className="form-text">
              أدريستك في الحفض والصون
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              كلمة السر
            </label>
            <div className="pass">
              <input
                type={typePass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChangeInput}
                value={password}
                name="password"
              />
              <small onClick={() => setTypePass(!typePass)}>
                {typePass ? "خبيني" : "وريني"}
              </small>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark"
            disabled={email && password ? false : true}
          >
            دخلني
          </button>
          <p className="my-2">
            ما عندكش كونت؟ <Link to="/Register">أعمل كونت توا</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
