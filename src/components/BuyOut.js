export default function BuyOut(props){
    /* I get access to the appObject and removeItem function from props  */
    const {appObject, setAppObject, removeItem} = props

    // Hide / Show Btn, appObject.toggler ( true/false , false/true ) 
   function toggle(){ 
        setAppObject( prevObject => {
            return{
                ...prevObject,
                toggle: !prevObject.toggle 
            }
        } ) 
    }
  
   return(
    <>
        <div className="div-toggle-store">
       
            <button onClick={toggle} className="toggle-show-hide-btn"> {appObject.toggle ? "Hide Items" : "Show Items"} </button>
          
            { !appObject.itemToBuy.length &&   <h1 className="no-item">No items!</h1>}
           
            <br />
            
            {
               appObject.toggle ? appObject.itemToBuy.map( item => {
                    //destructing the item from the store(array)
                    const {id, title, image, price } = item;

                    // Return this to the html
                    return(
                    
                        <div key={id}  className="buyOut-card" >
                            <div >
                                <div  className="buyOut-flex">
                                    <section className="buyOut-title">
                                        <h5>{title}</h5>
                                    </section>
                        
                                    <section>
                                        <img src={image} alt="" width='24px'  /> 
                                    </section>

                                    <section>
                                        <small>${price}</small>
                                    </section>

                                </div>
                                <button className="delete-btn" onClick={  () => removeItem(item) }>Delete</button>
                            </div>
                        </div>
                    )
                }) : ""
            }


       </div>
    </>
       
   )
}

