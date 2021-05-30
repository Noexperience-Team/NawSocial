import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import register from "./pages/Register";
import Alert from "./components/alert/Alert";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <input type="checkbox" id="theme" />

      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          <Alert />
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={register} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          <PrivateRouter exact path="/:page" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
