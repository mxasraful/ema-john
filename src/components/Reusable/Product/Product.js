import React from 'react';
import './Product.css'
import starIconLast from './../../../images/icons8-star-filled-16.png'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Product = (props) => {
    const { img, name, seller, price, stock, key, quantity, TotalPrice } = props.product;

    const cartPd = props.cart

    const removeFromCart = props.removeFromCart

    console.log(cartPd)

    return (
        <div className="home_product row">
            <div className="home_product_left_images col-2">
                <img className="img-fluid" src={img} alt="" />
            </div>
            <div className="home_product_right_content col-10">
                <Link to={"/product/" + key}><h2 className="home_product_right_content_title">{name.slice(0, 100)}</h2></Link>
                <div className="d-flex">
                    <div className="price_stock_add">
                        <div className="mb-3">By: {seller}</div>
                        <p className="price">$ {price}</p>
                        {
                            cartPd ?
                                <>
                                    <span>Items Added: <strong><input className="form_control_in_review" type="text" value={quantity} /></strong> Pec</span>
                                    <p className="allCartItemsRightTotalPrice">Total {quantity} pec Price: <strong>$ {quantity * price}</strong></p>
                                </>
                                :
                                <p className="stock">only {stock} left in stock - order soon</p>
                        }
                        {
                            props.ShowHideAddToCartBtn &&
                            <Button variant="contained" color="primary" id="add_to_cart" onClick={() => props.clickAddToCartBtn(props.product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-cart-plus me-2" viewBox="0 0 16 16">
                                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                    0
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                <span> Add To Cart</span>
                            </Button>
                        }
                        {
                            removeFromCart &&
                            <Button id="add_to_cart" onClick={() => props.removeFromCart(key)}>
                                <span> Remove from Cart</span>
                            </Button>
                        }
                    </div>
                    {
                        cartPd ?
                            ""
                            :
                            <div className="star_features ms-4">
                                <div className="star">
                                    <img alt="star" src="https://img.icons8.com/office/16/000000/filled-star.png" />
                                    <img alt="star" src="https://img.icons8.com/office/16/000000/filled-star.png" />
                                    <img alt="star" src="https://img.icons8.com/office/16/000000/filled-star.png" />
                                    <img alt="star" src="https://img.icons8.com/office/16/000000/filled-star.png" />
                                    <img alt="star" src={starIconLast} />
                                </div>
                                <div className="features">
                                    <h4>Features</h4>

                                </div>
                            </div>
                    }
                </div>
                <br /><br />
            </div>
            <hr />
        </div>
    );
};

export default Product;