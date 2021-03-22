import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';


// import Login from './Pages/auth/Login';
// import RegisterComplete from './Pages/auth/RegisterComplete';
// import Register from './Pages/auth/Register';
// import Home from './Pages/Home';
// import Header from './Components/Nav/Header';
// import SideDrawer from './Components/drawer/SideDrawer';
// import ForgotPassword from './Pages/auth/ForgotPassword';
// import History from './Pages/user/History';
// import UserRoute from './Components/routes/UserRoute';
// import AdminRoute from './Components/routes/AdminRoute';
// import Password from './Pages/user/Password';
// import Wishlist from './Pages/user/Wishlist';
// import AdminDashboard from './Pages/admin/AdminDashboard';
// import CategoryCreate from './Pages/admin/category/CategoryCreate';
// import CategoryUpdate from './Pages/admin/category/CategoryUpdate';
// import SubCreate from './Pages/admin/sub/SubCreate'
// import SubUpdate from './Pages/admin/sub/SubUpdate'
// import ProductCreate from './Pages/admin/product/ProductCreate';
// import AllProducts from './Pages/admin/product/AllProducts';
// import ProductUpdated from './Pages/admin/product/ProductUpdated';
// import Product from './Pages/Product';
// import CategoryHome from './Pages/category/CategoryHome';
// import SubHome from './Pages/sub/SubHome';
// import Shop from './Pages/Shop';
// import Cart from './Pages/Cart';
// import Checkout from './Pages/Checkout';
// import CreateCouponPage from './Pages/admin/coupon/CreateCouponPage';
// import Payment from './Pages/Payment';


// using lazy

const Login = lazy(() => import('./Pages/auth/Login'));
const RegisterComplete = lazy(() => import('./Pages/auth/RegisterComplete'));
const Register = lazy(() => import('./Pages/auth/Register'));
const Home = lazy(() => import('./Pages/Home'));
const Header = lazy(() => import('./Components/Nav/Header'));
const SideDrawer = lazy(() => import('./Components/drawer/SideDrawer'));
const ForgotPassword = lazy(() => import('./Pages/auth/ForgotPassword'));
const History = lazy(() => import('./Pages/user/History'));
const UserRoute = lazy(() => import('./Components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./Components/routes/AdminRoute'));
const Password = lazy(() => import('./Pages/user/Password'));
const Wishlist = lazy(() => import('./Pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./Pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./Pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./Pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./Pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./Pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./Pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./Pages/admin/product/AllProducts'));
const ProductUpdated = lazy(() => import('./Pages/admin/product/ProductUpdated'));
const Product = lazy(() => import('./Pages/Product'));
const CategoryHome = lazy(() => import('./Pages/category/CategoryHome'));
const SubHome = lazy(() => import('./Pages/sub/SubHome'));
const Shop = lazy(() => import('./Pages/Shop'));
const Cart = lazy(() => import('./Pages/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout'));
const CreateCouponPage = lazy(() => import('./Pages/admin/coupon/CreateCouponPage'));
const Payment = lazy(() => import('./Pages/Payment'));






const App = () => {
  const dispatch = useDispatch()


  // to cheak fireebase auth state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user)

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch])

  return (
    <Suspense 
      fallback={
      <div className='col text-center pt-5 '>
        __ React Redux EC<LoadingOutlined /> MMRC __
      </div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute exact path='/admin/category/:slug' component={CategoryUpdate} />
        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute exact path='/admin/product/:slug' component={ProductUpdated} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <AdminRoute exact path='/admin/coupon' component={CreateCouponPage} />
        <UserRoute exact path='/payment' component={Payment} />


        

      </Switch>
    </Suspense>
  );
}

export default App;
