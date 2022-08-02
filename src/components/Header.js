// To be able to change the globalStore i need to import useContext and StateContext
import { useContext } from 'react';
import { StateContext } from '../App';

export default function Header(){
   // Width help of useContext i can destruct the props sendt from the StateContext
  const { state, setState } = useContext(StateContext);

  function subtract(){
    setState( prevState => {
      return {
        ...prevState,
        count: prevState.count - 1
    }
    })
  }
  // true / false color styling on the h2
   const styled = {
    color: state.name === "Atle" ? "tomato" : "yellow"
   }
    return (
        <div className="header">
        	<h2 style={styled}>My name is : {state.name}</h2>
        	<h3>And the count number is : {state.count}</h3>
          <button onClick={subtract}>Click</button>
        </div>
    );
}