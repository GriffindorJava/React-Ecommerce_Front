import React from 'react';
import { Drawer, Button } from 'antd';
import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';

const SideDrawer = () => {
    // redux
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: '100px',
        hight: '100px',
        ObjectFit: 'cover',
    }

    return (
        <Drawer 
            className='text-center'
            title={`Cart / ${cart.length} Product`}
            placement='right'
            closable={false}
            visible={drawer}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}
            >
            {/* {JSON.stringify(cart)} */}

            {cart.map((p) => (
                <div key={p._id} className='row'>
                    <div className='col'>
                        {p.images[0] ? (
                            <>
                            <img src={p.images[0].url} style={imageStyle} />
                            <p className='text-center bg-secondary text-light'>
                                {p.title} x {p.count}
                            </p>
                            </>
                        ) : (
                            <>
                            <img src={laptop} style={imageStyle} />
                            <p className='text-center bg-secondary text-light'>
                                {p.title} x {p.count}
                            </p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button onClick={() => {
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    })
                }} className='text-center btn btn-primary btn-raised btn-block'
                >
                    Go To Cart
                </button>
                
            </Link>
        </Drawer>
    )
}

export default SideDrawer;
