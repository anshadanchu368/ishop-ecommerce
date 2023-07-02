import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../features/productSlice";
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js'
import Loading from "react-loading";


const ProductDetails = () => {
  const dispatch = useDispatch();

  const { details,loading} = useSelector((state) => state.products);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const product=details?.product;
  const name=product?.name;
  const { _id: uniq } = product || {};
  const images =product?.images;
  const reviews = product?.numOfReviews;
  const price=product?.price;
  const stock=product?.stock;
  const description=product?.desc;

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:details && details.product ? details.product.rating : 0,
    isHalf:true,
};

  return (
   <>
    {loading ? (<Loading type={"spin"} color={"red"} height={66} width={37}/>):(
        <>
        <div className="ProductDetails">
          <div className="left">
            <Carousel className="style">
              {images?.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
           <div className="right">
                      <div className="desc1">
                         <h2>{name || "default name"}</h2>
                         <p>Product # { uniq ||"unique id"}</p>
                        </div>
                      <div className="desc2">
                        <ReactStars {...options}/>
                        <span>({reviews || 0} reviews)</span>
                      </div>
                      <div className="desc3">
                        <h1>{price} rs</h1>
                        <div className="desc3-1">
                          <div className="des3-1-1">
                            <button>-</button>
                            <input  type="number" />
                            <button>+</button>
                          </div>
                          <button >Add to Cart</button>
                        </div>
                        <p>
                          status:
                          <b className={stock <1 ?"red":"green"}>
                            {stock <1 ? "out Of Stock" : "In Stock"}
                          </b>
                          
                        </p>
                      </div>
                      <div className="desc4">
                        Description:<p>{description}</p>
                      </div>
                      <button className="submitReview">Submit Review</button>
                      
           </div>
        </div>
  
        <h3 className="reviewHeading">REVIEWS</h3>
           {details && details.product && details.product.reviews[0] ? (
            <div className="reviews">
              {details && details.product && details.product.reviews.map((review)=><ReviewCard review={review} />)}
            </div>
           ):(
              <p className="noReviews">No Reviews Yet</p>
           ) }
  
  
  
      </>
    )}
   </>
  );
};

export default ProductDetails;
