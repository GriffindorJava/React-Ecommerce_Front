import React, { useState, useEffect } from 'react';
import AdminNav from '../../../Components/Nav/AdminNav';
import {getProductsByCount} from '../../../functions/product'
import AdminProductCard from '../../../Components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    //redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);

        });
    };

    const handleRemove = (slug) => {
        let answer = window.confirm('Are You Sure You Want to Delete?')
        if(answer) {
           // console.log("Send Delete Request", slug)
           removeProduct(slug, user.token)
           .then((res) => {
             loadAllProducts();
             toast.error(`${res.data.title} is Deleted`);
           })
           .catch((err) => {
              if (err.response.status === 400) toast.error(err.response.data);
              console.log(err)
           })
        }
    }
    return (
        <div className='conainer-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>

                <div className='col'>
                {loading ? (
                    <h4 className='text-danger'>Loading..</h4>
                ) : (
                    <h4>All Products</h4>
                    )}
                    <div className='row'>
                            {products.map((product) => (
                    <div key={product._id}  className='col-md-4 pb-3'>
                        <AdminProductCard 
                            product={product} 
                            handleRemove={handleRemove} />
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;
