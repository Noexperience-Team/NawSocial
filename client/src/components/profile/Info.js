import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "./info.css";
import { getProfileUsers } from "../../redux/actions/profileActiion";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { checkImage } from "../../utils/imageUpload";
import { updateProfileUser } from "../../redux/actions/profileActiion";
const Info = () => {
  const { id } = useParams();
  const { auth, theme, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userrData, setUserrData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [cover, setCover] = useState("");
  const [avatar, setAvatar] = useState("");
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setCover(file);
  };
  const nope = (e) => {
    setCover("");
  };
  const submit = (e) => {
    e.preventDefault();

    dispatch(updateProfileUser({ userData, avatar, cover, auth }));
    setCover("");
  };
  useEffect(() => {
    if (id === auth.user._id) {
      setUserrData([auth.user]);
      setUserData(auth.user);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserrData(newData);
    }
  }, [id, auth, dispatch, profile.users]);
  return (
    <div
      className="info"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userrData.map((user) => (
        <div
          className="info_container"
          key={user._id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="cover"
            style={{
              float: "center",
              height: "320px",
              width: "920px",
              minWidth: "100",
              backgroundImage: `url(${
                cover ? URL.createObjectURL(cover) : user.coverture
              })`,
              filter: `${theme ? "invert(1)" : "invert(0)"}`,
            }}
          >
            {user._id === auth.user._id ? (
              cover ? (
                <span className="change">
                  <button onClick={submit}>
                    <i className="fas fa-check" />
                    <p>مريقل</p>
                  </button>

                  <button onClick={nope}>
                    <i className="fas fa-times-circle"></i>
                    <p>مش موافق</p>
                  </button>
                </span>
              ) : (
                <span className="change">
                  <i className="fas fa-camera" />
                  <p>بدل الكوفرتير</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    onChange={changeAvatar}
                  />
                </span>
              )
            ) : (
              <div />
            )}

            <div
              style={{
                float: "right",

                height: "wrap",
                width: "wrap",
                display: "flex",
              }}
            >
              <div className="Name">
                <h3>{user.fullname}</h3>
                <div className="about follow_btn">
                  <span className="mr-4">
                    {user.followers.length} followers
                  </span>

                  <span className="ml-4">
                    {user.following.length} following
                  </span>
                </div>
                <div className="about">
                  {user._id === auth.user._id ? (
                    <button
                      className="btn btn-outline-light"
                      onClick={() => setOnEdit(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <FollowBtn user={user} />
                  )}
                </div>
              </div>
              <Avatar
                className="avatar"
                variant="square"
                style={{
                  backgroundImage: `url(${user.avatar})`,
                  float: "right",
                  height: "250px",
                  width: "200px",
                }}
              >
                <img
                  src={`${user.avatar}`}
                  style={{ height: "220px", width: "190px" }}
                />
              </Avatar>
            </div>
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
        </div>
      ))}
      {/*<p className="story">{userData.story}</p>*/}
    </div>
  );
};

export default Info;
