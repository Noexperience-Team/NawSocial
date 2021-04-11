import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const Header = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn == pathname) return "header__option--active";
  };
  return (
    <div className="header">
      <Link className="header__left" to="/">
        <img
          src={logo}
          alt="logo"
          style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
        ></img>
      </Link>
      <div className="header__input">
        <SearchIcon />
        <input placeholder="مانعملوش بحث" type="text" />
      </div>

      <div className="header__centre">
        <ul className="navbar-nav flex-row">
          {navLinks.map((link, index) => (
            <div
              className={`header__option ${isActive(link.path)}`}
              key={index}
            >
              <Link className="MuiSvgIcon-root" to={link.path}>
                <span className="material-icons  ">{link.icon}</span>
              </Link>
            </div>
          ))}
        </ul>

        {/*<div className="header__option">
          <SubscriptionsOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <StorefrontOutlinedIcon fontSize="large" />
        </div>*/}
      </div>
      <div className="header__right">
        {/*<IconButton>
          <AddIcon />
        </IconButton>

        <IconButton>
          <ForumIcon />
        </IconButton>

        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>*/}

        <div className="btn-group dropdown ">
          <button
            type="button"
            className="btn"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="header__info">
              <Avatar
                src={`${auth.user.avatar}`}
                style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
              />
              <h4>{auth.user.fullname}</h4>
              <ExpandMoreIcon />
            </div>
          </button>
          <div className="dropdown-menu drop ">
            <Link
              className="dropdown-item"
              to={`/profile/${auth.user.username}`}
            >
              البروفيل
            </Link>
            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
              }
            >
              {theme ? "ضاوية" : "كحلة"}
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              خارج
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
