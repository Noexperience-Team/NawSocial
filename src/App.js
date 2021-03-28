
import Widget from './Components/Widget'
import './App.css';
import Feed from './Components/Feed';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import { useStateValue } from './StateProvider';
function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <div className="app">
     
     {
        user ? (
          <>
            <Header />

            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widget />
            </div>
          </>
        ) : (
            <Login />
          )
      }
    </div>
  );
}

export default App;
//4qLvn3a59D3jyb65
