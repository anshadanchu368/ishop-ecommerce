import React, { useEffect, useState } from "react";
import "./productfilter.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductLists } from "../../features/productSlice";
import Product from "../layout/home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import ReactSlider from "react-slider";

const categories = [
  "Apple Car",
  "Air port & wireless",
  "Cables & Docks",
  "Cases & films",
"Charging Devices",
"Connected home",
"Headphones"]


const ProductFilter = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category,setCategory]=useState("")

  const { keyword } = useParams();

  const { loading, list, productsCount, resultPerPage,filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handleFilterRangeChange = (value) => {
    setPrice(value);
  };

  useEffect(() => { 
    dispatch(getProductLists({ keyword, currentPage,price ,category}));
  }, [dispatch, keyword, currentPage,price,category]);

  let count=filteredProductsCount
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="productsFiltered">
            {list &&
              list.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
          <div className="filterBox">
            <h2>Price</h2>
            <ReactSlider
              className="blue-slider"
              thumbClassName="blue-slider-thumb"
              trackClassName="blue-slider-track"
              min={0}
              max={25000}
              value={price}
              onChange={handleFilterRangeChange}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`blue-slider-track`}
                />
              )}
            />
            {count}
          </div>
          <ul className="Accessories">
            <h2>Categories</h2>
             {categories.map((category)=>(
              <li className="category-link" key ={category}  onClick={()=>setCategory(category)}>
                {category}

              </li>
             ))}
          </ul>
          {/* {resultPerPage <count && ( */}
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText=">>"
              prevPageText="<<"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default ProductFilter;
