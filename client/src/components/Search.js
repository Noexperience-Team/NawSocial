import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { getDataApi } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "./UserCard";
import { Link, useHistory } from "react-router-dom";
const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) =>
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          })
        );
    }
  }, [search, auth.token, dispatch]);
  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      let path = `/Search/${search}`;
      history.push(path);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
  return (
    <form className="search" onSubmit={handleSearch}>
      <div className="header__input">
        <SearchIcon onClick={handleSearch} />

        <input
          placeholder="مانعملوش بحث"
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
          }
        />
        <div
          className="close_search"
          style={{ opacity: search ? 0.9 : 0 }}
          onClick={handleClose}
        >
          &times;
        </div>
      </div>
      {search ? (
        <div className="users">
          {search &&
            users.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user._id}`}
                onClick={handleClose}
              >
                <UserCard user={user} border="border" theme={theme} />
              </Link>
            ))}
        </div>
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default Search;
