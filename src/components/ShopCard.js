// To be able to change the globalStore i need to import useContext and StateContext
import { useContext, useState } from 'react';
import { StateContext } from '../App';

// Need to send itemToBuy and setItemToBuy to the BuyOut-function with props
import BuyOut from './BuyOut';


export default function ShopCard(){
    // From useContext I can destruct the 'props' sendt from the StateContext
   const { state } = useContext(StateContext);

    // Making a object inside 1 useState so I dont need to prop so many useStats / useState-Functions
        // The itemToBuy array will contain all item's that will be added..
        // The price state is for display the total price
        // Toggler is for show or hide the store page..
    const [appObject, setAppObject] = useState({
        itemToBuy: [],
        price: 0,
        toggle: false
     })


    // The customer have sendt in the order list..
    function buyItem(){
     console.log( appObject )
    }

     // When add item btn is clicked: item.price will be added to the price state, and the item get stored inside the array with a unique id.
     function addItem(item){
                       
        setAppObject(prevObject => {
            
            return { 
                ...prevObject ,
                price: prevObject.price + item.price,
                itemToBuy: [...prevObject.itemToBuy, {...item, id: Date.now()}] } 
            })
      

        // Heigh light the buy Show store Btn
        document.querySelector(".toggle-show-hide-btn").style.boxShadow = "0 0 10px white";
    }

    /* If the item is insde the store, make change's to the Object state, or else keep the object state the same */
    function removeItem(item){  
        
        appObject.itemToBuy.includes(item)  ?  setAppObject(prevObject => {

            return {
                ...prevObject,
                price: prevObject.price - item.price,
                itemToBuy: prevObject.itemToBuy.filter( itemToBuy => itemToBuy.id !== item.id ) 
               
            }
        }): setAppObject( prevObject => prevObject )
        
        // Remove the light of Show Btn if itemToBuy dont item inside the array.
        if (appObject.itemToBuy.length){
            document.querySelector(".toggle-show-hide-btn").style.boxShadow = "none";
        }
    }

    return(
        // If state is true ( if axios call was success ). map state and display the return
        // And send the ObjectState to the BuyOut function component with props 
        <>
            <section id='section-checkOut' className='section-checkOut'>
                <span>
                    { appObject.price && appObject.itemToBuy.length ? <h1 className='totalSumAqua'>Total sum: ${ appObject.price.toFixed(2) }</h1> : "" }
                    { appObject.itemToBuy.length ? <div className='counter-item-store'>Item added: { appObject.itemToBuy.length }</div> : ""}
                </span>

                {/* Display the store */}
                { <BuyOut appObject={ appObject } setAppObject={ setAppObject } addItem={ addItem } removeItem={ removeItem } />}

                { 
                    appObject.itemToBuy.length ? <section className="buyOutBtn">
                    <button className="orderBtn" onClick={ buyItem }>Order Now</button> 
                    </section> : null 
                }
                     
            </section>

        
            <section id='section-store' className='section-grid'>
                { state && state.map( item => {
                    // if state (axios-get) is TRUE, then all this will work and get's displayed !

                    // Return this to the html
                    return (
                        
                    <div className='shop-card' key={ item.id } id="shop-card">
                        

                        <header className='shop-card-id'>
                            <h5>{ item.title }</h5>
                        </header>

                        <section className='shop-card-section-right'>
                            <img src={ item.image } alt="" className='shop-card-img' /> 
                        </section>
                    
                        <main className='shop-card-section-left'>
                            <p style={ { fontSize: "16px" } }> { item.description } </p>
                        </main>

                        <footer>
                            <section className='shop-card-section-price'>
                                <h3> $ { item.price } </h3>
                            </section>
                
                            <section className='shop-card-section-footer'>
                                <button onClick={ () => { addItem( item ) } } style={ { backgroundColor:"lime" } }>Add item</button>
                            </section>
                        </footer>

                    </div> )
                }) }
           </section>
        </>
    )
}