import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../Components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    // the function for cart total price 
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    };

    const saveOrderToDb = () => {
       // console.log('cart', JSON.stringify(cart, null, 4));
       userCart(cart, user.token)
       .then((res) => {
           console.log('CART POST RES', res)
           if(res.data.ok) history.push('/checkout');
       })
       . catch((err) => console.log('cart save err', err));
    };

    const saveCashOrderToDb = () => {
       // console.log('cart', JSON.stringify(cart, null, 4));
       // redux
       dispatch({
           type: 'COD',
           payload: true,
       });

       userCart(cart, user.token)
       .then((res) => {
           console.log('CART POST RES', res)
           if(res.data.ok) history.push('/checkout');
       })
       . catch((err) => console.log('cart save err', err));
    };


    const showCartItem = () => (
        <table className='table table-bordered'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Image</th>
                    <th scope='col' style={{ width: "100px", textAlign: 'center'}}>Title</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Price</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Brand</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Color</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Count</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Shipping</th>
                    <th scope='col' style={{ width: "80px", textAlign: 'center'}}>Remove</th>
                </tr>
            </thead>

            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}

        </table>
    )
        

    


    return (
        <div className='container-fluid pt-2'>
        <div className='row'>
            <div className='col-md-8'>
                <h4>Cart / {cart.length} Product</h4>
                {!cart.length ? (
                    <p>
                        No Products in cart. <Link to='/shop'>Continue Shopping</Link>
                        </p>
                    ) : (
                    
                        showCartItem()
                    
                    )}
            </div>
            <div className='col-md-4'>
                <h4>Order Summary</h4>
                <hr />
                <p>Products</p>
                {cart.map((c, i) => (
                    <div key={i}>
                        <p>
                            {c.title} x {c.count} = ${c.price * c.count}
                        </p>
                    </div>
                ))}
                <hr />
                    Total: <b>${getTotal()}</b>
                <hr />
                {
                    user ? (
                    <>
                        <button 
                            onClick={saveOrderToDb} 
                            className='btn btn-sm btn-primary mt-2'
                            disabled={!cart.length}
                            >
                            Proceed to Checkout
                        </button>

                        <br />

                        <button 
                            onClick={saveCashOrderToDb} 
                            className='btn btn-sm btn-warning mt-2'
                            disabled={!cart.length}
                            >
                            Pay Cash on Delivery
                        </button>
                    </>
                    ) : (
                        <button className='btn btn-sm btn-primary mt-2'>
                            <Link to={{
                                pathname: '/login',
                                state: { from: "cart" },
                            }}
                            >
                                Login to Checkout
                            </Link>
                        </button>
                    )}
            </div>
            <hr />
        </div>
        </div>
    )
}

export default Cart;
