import './App.css';
// importer FunctionComponent's
import Header from './components/Header';
import Main from './components/Main';
// to be able to make a global store, i imported useState and createContext
import { useState, createContext } from 'react';


// Making a globalState from createContext / exporting it to others FunctionComponent's
export const StateContext = createContext();

// initState is the useState default state
const initState = { 
  name: 'Atle', 
  count: 0 
}

/* Wrapping StateContext.Provider around the App return 'section', so all child can be able to use the globalState that's will be send by " props ", 
and destructed with useContext inside the diffrent FunctionComponent's  */
function App() {
  const [state, setState] = useState(initState);

  const styled ={
    backgroundColor: state.count % 2 ? "red" : "blue"
  }
  return (
    <StateContext.Provider value={ { state: state, setState: setState} }>
      <div className="App">
        <header className="App-header">
          <h1 style={styled}>React useContext Hook</h1>
          <Header />     
          <Main />     
        </header>
      </div>
      </StateContext.Provider>
  );
}

export default App;