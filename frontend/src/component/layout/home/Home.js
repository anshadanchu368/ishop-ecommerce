import React, { useEffect } from 'react'
import './home.css'
import Product from './Product.js'

import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/loader'
import { getProductLists } from '../../../features/productSlice'

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, list } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProductLists())
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);
  

  if (loading) {
    return <div>Loading...<Loader/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  



  return (
    <div className='product-title'>
      <h1 className="featured-p">
        Featured Products
      </h1>
      <div className="container">
        {list && list.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
