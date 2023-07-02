import React from 'react'
import Loading from 'react-loading'
import ReactStars from 'react-rating-stars-component'
import { useSelector } from 'react-redux'
import {  NavLink } from 'react-router-dom'
import './home.css'



const Product = ({product}) => {
  

   const {loading} =useSelector((state)=>state.products)

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:product.ratings,
    isHalf:true,
};
  return (
    <>
     {loading ? "loading":(
       <NavLink  className="productCard" key={product._id} to={`/products/${product._id}`}>
       <img src={product.images[0].url} alt='error '/>
       <p>{product.name}</p>
       <div>
          <ReactStars {...options}/><span>({product.numOfReviews} reviews)</span>
       </div>
       <span>{`${product.price}`}</span>
     </NavLink>
     )}
    </>
  )
}

export default Product
