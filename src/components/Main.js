// To be able to change the globalStore i need to import useContext and StateContext
import { useContext } from 'react';
import { StateContext } from '../App';

export default function Header(){
    // Width help of useContext i can destruct the props sendt from the StateContext
  const { setState } = useContext(StateContext);

  function add(){
    setState( prevState => {
      return {
        ...prevState,
        count: prevState.count + 1
    }
    })
  }

  function toogleName(){
    setState( prevState => {
        return{
            ...prevState,
            name: prevState.count % 2 ? "Malin" : "Atle"
        }
    })
  }
 
    return (
        <div>
          <button onClick={add}>Click to increment</button>
          <button onClick={toogleName}>toggleName on odd numbers</button>
        </div>
    );
}