import { GLOBALTYPES, DeleteData } from "./globalTypes";
import { getDataApi, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};
export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataApi(`/user/${id}`, auth.token);
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
export const updateProfileUser =
  ({ userData, avatar, cover, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "الإسم مش موجود" },
      });
    if (userData.fullname.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "الإسم طويل شوية" },
      });
    if (!userData.story > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "الستوري طويلة شوية" },
      });
    try {
      let media;
      let mediacover;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (cover) mediacover = await imageUpload([cover]);
      if (avatar) media = await imageUpload([avatar]);
      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
          coverture: cover ? mediacover[0].url : auth.user.coverture,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
            coverture: cover ? mediacover[0].url : auth.user.coverture,
          },
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] };
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });
    try {
      await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
export const unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser = {
      ...user,
      followers: DeleteData(user.followers, auth.user._id),
    };
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });
    try {
      await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
      console.log("hi");
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
