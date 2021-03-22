import React from "react";
import Jumbotron from '../Components/cards/Jumbotron';
import NewArrival from '../Components/home/NewArrival';
import BestSellers from '../Components/home/BestSellers';
import CategoryList from '../Components/category/CategoryList';
import SubList from '../Components/sub/SubList';




const Home = () => {

 return (
   <>
    <div className='jumbotron text-danger h1 font-weight-bold text-center'>
     <Jumbotron text={['New Arrivals', 'Best Sellers', 'Latest Products']} />
    </div>

    <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
      New Arrivals
      </h4>
      <NewArrival />


      <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
      Best Sellers
      </h4>
      <BestSellers />

      <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
      Categories
      </h4>
      <CategoryList />


      <h4 className='text-center p-3 mt-5 display-4 jumbotron'>
      Sub Categories
      </h4>
      <SubList />

       <br />
       <br />
  </>
);
}

export default Home;
