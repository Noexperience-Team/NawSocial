import { UpdateRounded } from "@material-ui/icons";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileActiion";
const FollowBtn = ({ user }) => {
  const [followed, setFollow] = useState(false);
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handelFollow = (e) => {
    setFollow(true);
    dispatch(follow({ users: profile.users, user, auth }));
  };
  const handelUnFollow = (e) => {
    setFollow(false);
    dispatch(unfollow({ users: profile.users, user, auth }));
  };
  useEffect(() => {
    if (
      auth.user.following.find(
        (item) => item._id !== null && item._id === user._id
      )
    ) {
      setFollow(true);
    }
  }, [auth.user.following, user._id]);
  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handelUnFollow}>
          متبعوش
        </button>
      ) : (
        <button className="btn btn-outline-light" onClick={handelFollow}>
          تبعو
        </button>
      )}
    </>
  );
};

export default FollowBtn;
