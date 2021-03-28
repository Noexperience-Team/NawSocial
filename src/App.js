import React from 'react';
import './App.css';
import Header from './Header';
import Messages from './Messages';
import Sidebar from './Sidebar';
import SideBarRight from './SideBarRight';
import Melek from './icons/melek.png';

function App() {
  return (
    <div className="App">
      
      <Header/>

      <div className='app__body'>
        
        <Sidebar/> {/* the one on the left */}
        
        <Messages box__color='rgb(9, 156, 17)'/>
        
        <SideBarRight src={Melek} avatar__color='green'/> {/* the one on the right */}
      
      </div>
    
    </div>
  );
};

export default App;