import React, {useState} from 'react';
import Tweet from './Tweet';


function App(){
  
  const [isRed, setRed] = useState(false);
  const [count, setCount] = useState(0);
  

  const increment = () => {
    setCount(count + 1);
    setRed(!isRed);
  };

  return(
    <div className="App">

      <h1>Hello </h1>
      <Tweet name="Ichrak" message="30/12/1997" imformation="ingénieur" pr="2DNI" />
      <Tweet name="Bacem" message="13/10/1996" imformation="ingénieur" pr="2DNI"/>
      <Tweet name="malek" message="1997" imformation="ingénieur" pr="2DNI"/>
      <Tweet name="amine" message="19967" imformation="ingénieur" pr="2DNI"/>

      <h1 className={isRed ? "red" : ""}>change my color!</h1>
      <button on onClick={increment}>Increment</button>
      <h1>{count}</h1>
      

    </div>
  );
}

export default App; 