import { useEffect, useState } from "react";
// import Cart from "./NavBar/Cart/Cart";
import NavBar from "./NavBar/NavBar";
import "./styles.css";
export default function App() {
  const [display, setDisplay]=useState([])
  const [search, setSearch]=useState("")
  const [find, setFind]=useState(display)

  const filter=(e)=>{
    const word=e.target.value
    if(word!==""){
      const result=display.filter((product)=>{
        return product.name.toLowerCase().startsWith(word.toLowerCase());
      });
      setFind(result)
    }else{
      setFind(display)
    }
    setSearch(word)
  }


  useEffect(()=>{
    fetch(`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`)
    .then(res=>res.json()).then(data=>setDisplay(data))
 
  },[])
  const addToCart=()=>{
    setDisplay((display)=>[...display])
  }
  return (
    <div className="App">
  
        {/* <Cart display={display}/> */}
        
      <NavBar search={search} handelChange={filter}/>
      <div className="product">
        {find && find.length>0 ? ( find.map((product)=>{
        return(
          <div key={product.id} className="product-array">
            <div className="image-div">
            <img src={product.imageURL} alt="img not found" className="product-image"/>
            </div>
            <div className="product-name">
            {product.name}
            </div>
            <div className="product-price">
            {product.price}₹
            </div>
            <div className="add-cart">
            <button type="submit" onClick={() => addToCart()}>Add to cart</button>
            </div>
          </div>
        
        )})):(<h1>not found</h1>)}
    
     
     
      </div>
    </div>
  );
}
