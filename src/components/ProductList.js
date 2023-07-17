import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from './Product';

function ProductList({ cartItems, setCartItems  }) {
    const [productList, setProductList] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    
    useEffect(() =>
    async function () {
        var response = await axios.get("http://localhost:4000/products",
        {headers: {Accept: "application/json"}})
        setProductList(response.data)
    }, [])

    function handleCategoryFilterChange(e) {
        e.preventDefault();
        setCategoryFilter(e.target.value === 'null' ? null : e.target.value);
    }

    const navigate = useNavigate();
    const addItemToCart = (index) => {
        const selectedProduct = productList[index];
        setCartItems((prevCartItems) => [...prevCartItems, selectedProduct]);
        navigate('/cart');
      };
      
    return (
        <div className="background">           
            <div className="row banner">
                <h3>SHOP HERE</h3>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 ">
                        <h6>Filter by dietary requirement here</h6>
                        <select
                        value={categoryFilter}
                        className="btn btn-outline-secondary btn-sm"
                        type="dropdown"
                        onChange={handleCategoryFilterChange}
                        >
                            <option value="">All</option>
                            <option value="true">Gluten Free</option>
                            <option value="false">Diary Free</option>
                        </select>
                    </div>
                    <div className="col-sm-9 ">
                            <h6>Filter by age group here</h6>

                            <select
                            value={categoryFilter}
                            className="btn btn-outline-secondary btn-sm"
                            type="dropdown"
                            onChange={handleCategoryFilterChange}
                            >
                                <option value="">All</option>
                                <option value="true">Gluten Free</option>
                                <option value="false">Diary Free</option>
                            </select>
                        </div>
                    </div>
                <div className="row">
                    {productList.map(function (product, index) {
                    if (
                        (categoryFilter === '' || categoryFilter === 'true') &&
                        product.gluten_free
                    ) {
                    return (
                        <div className="col-sm-4 mb-3 mb-sm-5" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <Product
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock} gluten_free={product.gluten_free} diary_free={product.diary_free}
                                    />
                                    <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addItemToCart(index)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                } else if (
                    categoryFilter === 'false' &&
                    product.diary_free
                    ) {
                    return (
                        <div className="col-sm-4 mb-3 mb-sm-5" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <Product
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock}
                                    gluten_free={product.gluten_free}
                                    diary_free={product.diary_free}
                                    />
                                    <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addItemToCart(index)}
                                    >
                                    Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                    }
                    else if (categoryFilter === '') { return (
                        <div className="col-sm-4 mb-3 mb-sm-5" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <Product
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock}
                                    gluten_free={product.gluten_free}
                                    diary_free={product.diary_free}
                                    />
                                    <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addItemToCart(index)}
                                    >
                                    Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    return null;
                    })}
                </div>
            </div>
        </div>
    );
  }

export default ProductList;
