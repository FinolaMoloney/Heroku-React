import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from './Product';

function ProductList({ cartItems, setCartItems  }) {
    const [productList, setProductList] = useState([]);
    const [dietFilter, setDietFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    
    useEffect(() =>
    async function () {
        var response = await axios.get("http://localhost:4000/products",
        {headers: {Accept: "application/json"}})
        setProductList(response.data)
    }, [])

    function handleDietFilterChange(e) {
        e.preventDefault();
        setDietFilter(e.target.value === 'null' ? null : e.target.value);
        setAgeFilter('');
    }

    function handleAgeFilterChange(e) {
        e.preventDefault();
        setAgeFilter(e.target.value === 'null' ? null : e.target.value);
        setDietFilter('');
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
                        value={dietFilter}
                        className="btn btn-outline-secondary btn-sm"
                        type="dropdown"
                        onChange={handleDietFilterChange}
                        >
                            <option value="">All</option>
                            <option value="gluten">Gluten Free</option>
                            <option value="diary">Diary Free</option>
                        </select>
                    </div>
                    <div className="col-sm-9">
                            <h6>Filter by age group here</h6>

                            <select
                            value={ageFilter}
                            className="btn btn-outline-secondary btn-sm"
                            type="dropdown"
                            onChange={handleAgeFilterChange}
                            >
                                <option value="">All</option>
                                <option value="6-12M">6-12 Months</option>
                                <option value="1-2Y">1-2 Years</option>
                                <option value="2-4Y">2-4 Years</option>
                            </select>
                        </div>
                    </div>
                <div className="row">
                    {productList.map(function (product, index) {
                    if (
                        (dietFilter === 'gluten' && ageFilter === '') &&
                        product.gluten_free
                    ) {
                    return (
                        <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                    (dietFilter === 'diary' && ageFilter === '') &&
                    product.diary_free
                    ) {
                    return (
                        <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                    else if (
                        (dietFilter === '' && ageFilter === '6-12M') &&
                        product.months_6_to_12
                        ) {
                        return (
                            <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                        else if (
                            (dietFilter === '' && ageFilter === '1-2Y') &&
                            product.years_1_to_2
                            ) {
                            return (
                                <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                        else if (
                            (dietFilter === '' && ageFilter === '2-4Y') &&
                            product.years_2_to_4
                            ) {
                            return (
                                <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                            else if (
                                (dietFilter === '' && ageFilter === '') 
                                ) {
                                return (
                                    <div className="col-sm-5 mb-3 mb-sm-4" key={index}>
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
                    return null;
                    })}
                </div>
            </div>
        </div>
    );
  }

export default ProductList;
