import React, { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from './../../utilities/databaseManager';
import { useEffect } from 'react';
import Cart from '../Reusable/SmallCart/SmallCart';
import "./Review.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import Button from '@material-ui/core/Button';
import spinner from './../../Spinner/spinner.gif'
import Product from '../Reusable/Product/Product';

const Review = () => {

    const auth = useAuth()
    const [dataOk, setDataOk] = useState(false)
    const [cart, setCart] = useState([]);

    // Remove Products From Database
    const removeFromCart = (pds) => {
        const newCart = cart.filter(pd => pd.key !== pds)
        setCart(newCart)
        removeFromDatabaseCart(pds)
    }

    // Load Products And Cart management
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const getKeys = Object.keys(savedCart);
        console.log(getKeys)
        fetch('http://localhost:3001/productsByKey', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getKeys)
        })
            .then(res => res.json())
            .then(data => {
                const cartProduct = getKeys.map(key => {
                    const pd = data.find(keys => keys.key === key)
                    pd.quantity = savedCart[key];
                    return (pd)
                })
                setCart(cartProduct)
                setDataOk(true)
            })
    }, [])

    return (
        <div className='reviewPage container'>
            <div className="row mt-4">
                <div className="reviewCartItems col-sm-9 border-end">
                    {dataOk ?
                        <>
                            {
                                cart.map(pd => <Product
                                    cart={true}
                                    product={pd}
                                    removeFromCart={removeFromCart}
                                    key={pd.key}
                                ></Product>)
                            }
                            {
                                !cart.length &&
                                <div style={{ padding: "25vh 0" }} className="noProductInCart text-center">
                                    <h5>Not have any product in your cart</h5>
                                    <br /><br />
                                    <Button size="small" variant="outlined" color="primary" className="px-4" href="/">continue shopping</Button>
                                </div>
                            }
                        </>
                        :
                        <div className="shopLoader text-center mt-4" style={{ paddingTop: "26vh", paddingBottom: "28vh" }}>
                            <div className="shopSpinnerImg">
                                <img style={{ width: "60px" }} src={spinner} alt="" />
                            </div>
                        </div>
                    }
                </div>
                {
                    cart.length > 0 &&
                    <div style={{ marginBottom: '20px' }} className="reviewCartChackOut col-sm-3">
                        <Cart orderedItems={cart}>
                            <Link to='checkout'>
                                <Button id="add_to_cart" style={{ marginLeft: "23px", padding: "5px 15px" }}>
                                    {
                                        auth.user ?
                                            "Proceed to checkout"
                                            :
                                            "Login to checkout"
                                    }
                                </Button>
                            </Link>
                        </Cart>
                    </div>
                }
            </div>
        </div>
    );
};

export default Review;