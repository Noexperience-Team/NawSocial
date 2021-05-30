import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./editProfile.css";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { checkImage } from "../../utils/imageUpload";
import { updateProfileUser } from "../../redux/actions/profileActiion";
const EditProfile = ({ user, setOnEdit }) => {
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
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    setUserData(user);
  }, [user]);
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, cover, auth }));
  };
  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        close
      </button>
      <form onSubmit={handlesubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)", size: "100px" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="fullname" style={{ float: "right" }}>
            الإسم و اللقب
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "70%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile" style={{ float: "right" }}>
            نومروك
          </label>

          <input
            type="number"
            className="form-control"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ float: "right" }}>
            مقر السكنة
          </label>

          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website" style={{ float: "right" }}>
            موقعك على الأنترنات
          </label>

          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={website}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="story" style={{ float: "right" }}>
            إحكيلنا حكايتك
          </label>

          <textarea
            className="form-control"
            id="story"
            name="story"
            value={story}
            onChange={handleInput}
            cols="30"
            rows="4"
          />
          <small className="text-danger d-block text-right">
            {story.length}/200
          </small>
        </div>
        <button className="btn btn-info w-100" type="submit">
          مريقل
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
