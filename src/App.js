import './style/App.css';
import Security from './Security'
import Body from './Body'
import Profil from './Profil'
import Bottom from './Bottom'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router> 
      <div className="App">
        
        <Switch>
        
          <Route path="/security">
              <Security/>
              <Bottom/>
          </Route>

          <Route path="/profile">
              <Profil/>
              <Bottom/>
          </Route>

          <Route path="/">
              <Body/>
              <Bottom/>
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
