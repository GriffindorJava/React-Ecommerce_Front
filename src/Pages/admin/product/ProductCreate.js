import React, { useState, useEffect } from 'react';
import AdminNav from '../../../Components/Nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../Components/form/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../Components/form/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';


const initialState = {
        title: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        colors: ["Black", "Brown", "Silver", "White", "Blue"],
        brands: ["Apple", "Samsung", "Microsoft", "Lenevo", "ASUS", "HP"],
        color: "",
        brand: "",
    };

const ProductCreate = () => {
    const [values, setValue] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => 
    getCategories().then((c) => setValue({ ...values, categories: c.data }));

        const handleSubmit = (e) => {
            e.preventDefault();
            createProduct(values, user.token)
            .then((res) => {
                //console.log(res);
                window.alert(`Your Product "${res.data.title}" is Created`);
                window.location.reload();
            })
            .catch((err) => {
                //console.log(err)
               // if(err.response.status === 400) toast.error(err.response.data);
               toast.error(err.response.data.err);
            })
        };

        const handleChange = (e) => {
            setValue({ ...values, [e.target.name]: e.target.value });
        };

        const handleCategoryChange = (e) => {
            e.preventDefault();
          //  console.log('CLICK CATEGORY', e.target.value);
            setValue({ ...values, subs: [], category: e.target.value });
            getCategorySubs(e.target.value).then((res) => {
                  //  console.log("SUB CATEGOR ON CLICK", res);
            setSubOptions(res.data);
                    
            });
            setShowSub(true);
        };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>

            <div className='col-md-10'>
                {loading ? (
                <LoadingOutlined  className='text-danger h4'/>
                 ) : ( 
                 <h4>Product Create</h4>
                 )}
                <hr />

                {/* {JSON.stringify(values.images)} */}

                <div className='p-3'>
                    <FileUpload 
                       values={values} 
                       setValue={setValue} 
                       setLoading={setLoading} 
                    />
                </div>

                <ProductCreateForm 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    setValue={setValue}
                    values={values} 
                    handleCategoryChange= {handleCategoryChange}
                    subOptions={subOptions}
                    showSub={showSub}
                />
                
            </div>
          </div>
        </div>
    )
}

export default ProductCreate
