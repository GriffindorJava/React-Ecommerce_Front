import React, { useState, useEffect } from 'react';
import { 
    getProductsByCount, 
    fetchProductsByFilter 
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub'
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { 
    DollarOutlined, 
    DownSquareOutlined, 
    StarOutlined, 
    TagsOutlined, 
    BgColorsOutlined, 
    AntDesignOutlined,
    TransactionOutlined,
} from '@ant-design/icons';
import Star from '../Components/form/Star';


const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] =useState('');
    const [brands, setBrands] = useState([
        "Apple", 
        "Samsung", 
        "Microsoft", 
        "Lenevo", 
        "ASUS", 
        "HP",
        ]);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState([
        "Black",
        "Brown", 
        "Silver", 
        "White", 
        "Blue",
        ]);

    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState("");
    


    let dispatch = useDispatch();

    let { search } =  useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories 
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
    });
    };


    //1. load products by default on page load

    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    //2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
             fetchProducts({query: text});
             if (!text) {
                 loadAllProducts();
             }
        }, 300)
       return() => clearTimeout(delayed);
    }, [text]);


    // 3. load products on the price range
    useEffect(() => {
        console.log('ok to request')
        fetchProducts({ price });

    }, [ok]);

    const handleSlider = (value) => {
        dispatch ({
            type: "SEARCH_QUERY",
            payload: { text: ""},
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar('');
        setSub('');
        setBrand('');
        setColor("");
        setShipping("");
        setTimeout(() => {
            setOk(!ok)
        }, 300);
    };

    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () => 
        categories.map((c) => (
        <div key={c._id}>
            <Checkbox
                onChange={handleCheck}
                className='pb-2 pl-4 pr-4' 
                style={{ fontSize: "14px", fontWeight: '400', cursor: "pointer"}}
                value={c._id} 
                name='category'
                checked={categoryIds.includes(c._id)}
                >
                {c.name}
            </Checkbox>
         </div>
        ));

        // handle Check for categories
        const handleCheck = (e) => {
            // reset
            dispatch ({
            type: "SEARCH_QUERY",
            payload: { text: ""},
            });
            setPrice([0, 0]);
            setStar('');
            setSub('');
            setBrand('');
            setColor("");
            setShipping("");

           // console.log(e.target.value)
            let inTheState = [ ...categoryIds ];
            let justChecked = e.target.value;
            let foundInTheState = inTheState.indexOf(justChecked); // index or -1

            // indexOf Method ?? if not found returns -1 else return index
            if(foundInTheState === -1) {
                inTheState.push(justChecked);
                } else {
                    // if found pull out one item from index
                    inTheState.splice(foundInTheState, 1);
                } 

                setCategoryIds(inTheState);
              //  console.log(inTheState);
              fetchProducts({category: inTheState})
             };

        // 5. Products by star rating 
        const handleStarClick = (num) => {
           // console.log(num);
            dispatch ({
                type: "SEARCH_QUERY",
                payload: { text: ""},
            });
            setPrice([0, 0]);
            setCategoryIds([]);
            setStar(num);
            setSub('');
            setBrand('');
            setColor("");
            setShipping("");
            fetchProducts({ stars: num });
        };

        const showStars = () => (
            <div className='pr-4 pl-4 pb-2'>
                <Star starClick = {handleStarClick} numberOfStars = {5} />
                <Star starClick = {handleStarClick} numberOfStars = {4} />
                <Star starClick = {handleStarClick} numberOfStars = {3} />
                <Star starClick = {handleStarClick} numberOfStars = {2} />
                <Star starClick = {handleStarClick} numberOfStars = {1} />

            </div>
        );


    // 6. show products by sub categroy
        const showSubs = () => subs.map((s) => (
            <div 
                key={s._id}
                onClick={() => handleSub(s)}
                className= 'p-1 m-1 badge badge-secondary'
                style={{ fontSize: "12px", fontWeight: '400', cursor: "pointer"}}
            >
            {s.name}
        </div>
        ));

        const handleSub = (sub) => {
           // console.log('SUB', sub);
            setSub(sub);
            dispatch ({
                type: "SEARCH_QUERY",
                payload: { text: ""},
            });
            setPrice([0, 0]);
            setCategoryIds([]);
            setStar('');
            setBrand('');
            setColor("");
            setShipping("");
            fetchProducts({ sub });
        };
        

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
        style={{ fontSize: "14px", fontWeight: '400'}}
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setShipping("");
    setColor("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
        style={{ fontSize: "14px", fontWeight: '400'}}
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

// 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        style={{ fontSize: "14px", fontWeight: '400'}}
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-3 pr-4"
        style={{ fontSize: "14px", fontWeight: '400'}}
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };


        

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search/Filter</h4>
                    <hr />

                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode='inline'>


                        {/* price */}
                        <SubMenu key='' 
                            title={
                            <span className='h6'>
                                <DollarOutlined />
                                    <b style={{fontSize:'13px'}}>Price</b>
                            </span>
                            }
                        >
                            <div>
                                <Slider 
                                    className='ml-4 mr-4' 
                                    tipFormatter={(v) => `$${v}` } 
                                    range 
                                    value={price} 
                                    onChange={handleSlider}
                                    max='4999'
                                    />
                            </div>
                        </SubMenu>



                        {/* Category */}

                         <SubMenu key='' 
                            title={
                            <span className='h6'>
                                <DownSquareOutlined />
                                    <b style={{fontSize:'13px'}}>Categories</b>
                            </span>
                            }
                        >
                            <div style={{marginTop: "10px"}}>
                                {showCategories()}
                            </div>
                        </SubMenu>


                        
                        {/* Multi Stars Rating  */}

                         <SubMenu key='' 
                            title={
                            <span className='h6'>
                                <StarOutlined />
                                    <b style={{fontSize:'13px'}}>Rating</b>
                            </span>
                            }
                        >
                            <div style={{marginTop: "10px"}}>
                                {showStars()}
                            </div>
                        </SubMenu>



                        {/* sub categories  */}

                         <SubMenu key='' 
                            title={
                            <span className='h6'>
                                <TagsOutlined />
                                    <b style={{fontSize:'13px'}}>Sub Categories</b>
                            </span>
                            }
                        >
                            <div 
                                style={{marginTop: "10px"}}
                                className='pl-4 pr-4'
                                >
                                {showSubs()}
                            </div>
                        </SubMenu>



                        {/* brands */}
                        <SubMenu
                        key=""
                        title={
                            <span className="h6">
                            <AntDesignOutlined />
                                <b style={{fontSize:'13px'}}>Brands</b>
                            </span>
                        }
                        >
                        <div style={{ maringTop: "10px" }} className="pl-1">
                            {showBrands()}
                        </div>
                        </SubMenu>



                        {/* colors */}
                        <SubMenu
                        key=""
                        title={
                            <span className="h6">
                            <BgColorsOutlined />
                                <b style={{fontSize:'13px'}}>Colors</b>
                            </span>
                        }
                        >
                        <div style={{ maringTop: "10px" }} className="pl-1">
                            {showColors()}
                        </div>
                        </SubMenu>

                        {/* shipping */}

                        <SubMenu
                        key=""
                        title={
                            <span className="h6">
                            <TransactionOutlined />
                                <b style={{fontSize:'13px'}}>Shipping</b>
                            </span>
                        }
                        >
                        <div style={{ maringTop: "10px" }} className="pl-2 pr-2">
                            {showShipping()}
                        </div>
                        </SubMenu>
                        
                    </Menu>
                </div>

            <div className='col-md-9 pt-2'>
                        {loading ? (
                            <h4 className='text-danger'>Loading..</h4>
                        ) : (
                            <h4 className='text-danger'>Products</h4>

                        )}

                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='row pb-5'>
                            {products.map((p) => (
                            <div key={p._id} className='col-md-4 mt-3'>
                                <ProductCard product={p} />
                            </div>))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Shop
