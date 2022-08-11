import './App.css';
// import the Card with all description from the axios call
import ShopCard from './components/ShopCard';

// to be able to make a global store, i imported useState and createContext
import { useState, createContext, useEffect } from 'react';

// importing axios to use axios
import axios from 'axios';

// Making a globalState from createContext / exporting it to others FunctionComponent's
export const StateContext = createContext();

/* Wrapping StateContext.Provider around the App return 'section', so all child can be able to use the globalState that's will be send by " props ", 
and destructed with useContext inside the diffrent FunctionComponent's  */
function App() {
  const [state, setState] = useState('');
  const [error, setError] = useState('');


  // When page render the function  inside useEffect fire up and get the response of the api call!
  useEffect( () => {
    axios.get('https://fakestoreapi.com/products').then(response => {
    // then store the response.data to the state..
      setState(response.data)
   // Global STATE !, had å plan, but becuse of the condision rending of shopCard this didten work as planned..
      setState(prevState => [...prevState, {counter:0 , array: []} ])
    })
    .catch(error => {
    // if a error, it will be saved in the error state, and the state will become true
      setError(true)
    })
  },[])


  return (
    
    <StateContext.Provider value={ { state: state, setState: setState } }>
      <div className="App">
        <header className="App-header">
          <section className='sectoin-title'>
            <h1 className='whiteStroke'>Fake Summer Shop ©2022 ✌️</h1>
          </section>
          <section className='section-grid'>
            {state ? <ShopCard /> : error ? <div><h1>Error.. TRY again please..</h1></div> : <div> Page is loading.. </div>}
          </section>
          
        </header>
      </div>
      </StateContext.Provider>
  );
}

export default App;






