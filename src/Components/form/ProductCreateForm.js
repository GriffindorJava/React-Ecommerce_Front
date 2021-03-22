import React from 'react';
import { Select } from 'antd';


const { Option } = Select;



const ProductCreateForm = ({ 
    handleSubmit, 
    handleChange, 
    setValue,
    handleCategoryChange, 
    values, 
    subOptions, 
    showSub
    }) => {

       // destructure
        const {
            title, 
            description, 
            price, 
            categories, 
            category, 
            subs, 
            shipping, 
            quantity, 
            images, 
            color, 
            colors, 
            brand, 
            brands
        } = values;
    
    return (
    <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Title</label>
                        <input 
                            type='text' 
                            name='title'
                            className='form-control' 
                            value={title} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <input 
                            type='text' 
                            name='description'
                            className='form-control' 
                            value={description} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='form-group'>
                        <label>Price</label>
                        <input 
                            type='text' 
                            name='price'
                            className='form-control' 
                            value={price} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='form-group'>
                        <label>Shipping</label>
                        <select 
                            name='shipping' 
                            className='form-control'
                            onChange={handleChange}
                            >
                                <option value="No">NO</option>
                                <option value="Yes">Yes</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Quantity</label>
                        <input 
                            name='quantity' 
                            className='form-control'
                            value= {quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Color</label>
                        <select 
                            name='color' 
                            className='form-control'
                            onChange={handleChange}
                            >
                                <option>Please Select</option>
                                {colors.map((c) => (
                                <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Brand</label>
                        <select 
                            name='brand' 
                            className='form-control'
                            onChange={handleChange}
                            >
                                <option>Please Select</option>
                                {brands.map((b) => (
                                <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className='form-group mr-2'>
                        <label>Category</label>
                        <select 
                            name="category" 
                            className="form-control" 
                            onChange={handleCategoryChange}
                            >

                            <option>Please Select</option>
                            {categories.length > 0 && 
                            categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                                </option>
                                ))}
                        </select>

                    </div>
                   {showSub && <div>
                        <label>Sub Category</label>
                        <Select
                            mode='multiple'
                            style={{ width: "100%" }}
                            placeholder='Please Select'
                            value={subs}
                            onChange={(value) => setValue({ ...values, subs: value })}
                        >
                            {subOptions.length && subOptions.map((s) => (
                                <Option value={s._id} key={s._id}>
                                    {s.name}
                                </Option>
                                ))}
                        </Select>
                   </div>}
                   <br />

                    <button className='btn btn-outline-info'>Save</button>
                </form>
    );
};

export default ProductCreateForm
