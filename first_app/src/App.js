import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="relative h-96 rounted-b flex justify-centre">
        <img src="/images/couverture2.jpg" className="object-cover w-full w-full rounded-b" alt="cover" />
        
      </div>
      <div className="relative h-96 rounted-b flex justify-centre">
        <img src="/images/profil.jpg" className="object-cover w-full w-full rounded-b" alt="cover" />
        
      </div>
      <div className="text-center mt-6 text-3xl font-bold text-fBlack">
        <h2>Ichrak Gara</h2>
      </div>


      <div className="border border-fGrey mt-6 border-opacity-10" />
      <div className="flex justify-between px-8">
        <div className="flex items-center">
          <div className="px-4 py-5 text-fBlue border-b-4 border-fBlue">
            <h3>Posts</h3>
          </div>
          <div className="px-4 py-5 text-fGrey">
          <h3>Friends</h3> <span className="text-sm ml-1">458</span>
          </div>
          <div className="px-4 py-5 text-fGrey"><h3>Photos</h3></div>
          <div className="px-4 py-5 text-fGrey"><h3>Videos</h3></div>
          <div className="px-4 py-5 text-fGrey"><h3>likes</h3></div>
          <div className="px-4 flex items-center py-5 text-fGrey">
          <h3>More</h3>
            
          </div>
        </div>
      </div>
        
      </div>
  );
}

export default App;
