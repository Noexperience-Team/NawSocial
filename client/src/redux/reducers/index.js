import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import chatSlice from "../../components/messages/features/chatSlice";
export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  chat: chatSlice,
});
