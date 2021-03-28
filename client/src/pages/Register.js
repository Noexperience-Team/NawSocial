import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { register } from "../redux/actions/authAction";
import logo from "../images/logo.svg";
import "./Register.css";
const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();
  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
    role: "student",
  };
  const [userData, setUserData] = useState(initialState);
  const {
    fullname,
    username,
    email,
    password,
    cf_password,
    gender,
    role,
  } = userData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  const [typePass, setTypePass] = useState(false);
  const [typeConfirme, setTypeConfirme] = useState(false);
  return (
    <div className="auth__page">
      <div className="login">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2 className="text-uppercase text-center mb4">Naw-Social</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="fullname" className="form-label text-right">
              الإسم واللقب
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
              style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
            />
            <small className="form-text text-danger">
              {alert.fullname ? alert.fullname : ""}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              تربيجتك
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
            />
            <small className="form-text text-danger">
              {alert.username ? alert.username : ""}
            </small>
          </div>
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
              style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
            />
            <div
              id="emailHelp"
              className={alert.email ? "form-text text-danger" : "form-text"}
            >
              {alert.email ? alert.email : "أدريستك في الحفض والصون"}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              الموديباس{" "}
            </label>
            <div className="pass">
              <input
                type={typePass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChangeInput}
                value={password}
                name="password"
                style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
              />
              <small onClick={() => setTypePass(!typePass)}>
                {typePass ? "خبيني" : "وريني"}
              </small>
            </div>
            <small className="form-text text-danger">
              {alert.password ? alert.password : ""}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="cf_password" className="form-label">
              عاودلنا الموديباس{" "}
            </label>
            <div className="pass">
              <input
                type={typeConfirme ? "text" : "password"}
                className="form-control"
                id="cf_password"
                onChange={handleChangeInput}
                value={cf_password}
                name="cf_password"
                style={{
                  background: `${alert.cf_password ? "#fd2d6a14" : ""}`,
                }}
              />
              <small onClick={() => setTypeConfirme(!typeConfirme)}>
                {typeConfirme ? "خبيني" : "وريني"}
              </small>
            </div>
            <small className="form-text text-danger">
              {alert.cf_password ? alert.cf_password : ""}
            </small>
          </div>
          <div className=" check">
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                defaultChecked
                onChange={handleChangeInput}
              />{" "}
              : معلم
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChangeInput}
              />{" "}
              : أميرة
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-dark"
            //disabled={email && password ? false : true}
          >
            وقيت بش تقيد
          </button>
          <p className="my-2">
            ديجا عندك كونت ؟ <Link to="/">أدخل توا</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
