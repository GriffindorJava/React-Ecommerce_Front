import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import{ Link } from 'react-router-dom';
import{ HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

// this is children component of Product Page

const SingleProduct = ({product, onStarClick, star }) => {
    const { title, images, description, _id } = product;

    const [tooltip, setTooltip] = useState('Click to add');

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    //router
    let history = useHistory();

    // Add to chart funtion for Ecommerace
    const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if(typeof window !== 'undefined') {
      // if cart is in localstorate Get it
      if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual)
      // save to local storage 
      // console.log('unique', unique);
      localStorage.setItem('cart', JSON.stringify(unique));
      //show tooltip
       setTooltip("Added");


       // add to redux state
       dispatch( {
         type: "ADD_TO_CART",
         payload: unique,
       });

      // show cart item in side drawer
       dispatch( {
         type: "SET_VISIBLE",
         payload: true,
       });
    }

  };


  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log('ADDED TO WISHLIST', res.data);
      toast.success("ADDED TO WISHLIST");
      history.push('/user/wishlist');
    });
  };


    return (
        <>
          <div className='col-md-7'>
              {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
                  {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
              </Carousel>
              ) : (
              <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
              )}

              <Tabs type='card'>
                  <TabPane tab='Description' key='1'>
                      {description && description}
                  </TabPane>

                   <TabPane tab='More' key='2'>
                      Call use on xxxx xxx xxx to learn more about this product.
                  </TabPane>
              </Tabs>
          </div>  


          <div className='col-md-5'>
              <h1 className='bg-info p-3'>{title}</h1>

              {product && product.ratings && product.ratings.length > 0 ? (
                  showAverage(product) 
                ) : (
                    <div className='text-center pt-1 pb-3'>No Rating yet</div>
                )}
              

              <Card 
                actions=
              {[
                    <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart}>
                        <ShoppingCartOutlined className="text-danger"/> <br />
                        Add to Cart
                    </a>
                    </Tooltip>,
                  
                    <a onClick={handleAddToWishlist}>
                      <HeartOutlined 
                        className='text-info' /> <br /> 
                        Add to Wishlist
                    </a>,

                    <RatingModal>
                        <StarRating
                            name = {_id}
                            numberOfStars = {5}
                            rating = {star}
                            changeRating = {onStarClick}
                            isSelectable = {true}
                            starRatedColor ="red"
                        />

                        </RatingModal> 
              ]}
              > 
                <ProductListItems product={product} />
              </Card>
          </div>  
        </>
    );
};

export default SingleProduct
