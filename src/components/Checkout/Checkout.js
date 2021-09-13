import React, { useEffect, useState } from 'react';
import './Checkout.css';
import spinner from './../../Spinner/spinner_2.gif'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Checkout = () => {

    const [cart, setCart] = useState([])

    const [loader, setLoader] = useState(true)

    // const [paymentOk, setPaymentOk] = useState(false)

    const auth = useAuth()

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        // TODO: Asraful Move This After Payment
        const savedCart = getDatabaseCart()
        const orderDt = {
            name: auth.user.name,
            email: auth.user.email,
            cart: savedCart,
        }
        fetch('http://localhost:3001/orderPost', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDt)
        })
            .then(res => res.json())
            .then(data => {
                alert("Order Place Successful....")
                console.log(data)
                processOrder()
            })
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const getKeys = Object.keys(savedCart);
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
                setLoader(false)
                console.log(data)
            })
    }, [])

    // document.querySelector("#paymentCod").addEventListener("click", () => {
    //     alert("ass")
    // })

    // const paymentCodCheck = document.querySelector('.paymentCodCheck')

    // const paymentCodChecked = document.getElementsByClassName('paymentCodChecked')

    // if (paymentCodCheck) {
    //     paymentCodCheck.addEventListener("click", () => {
    //         document.querySelector("#paymentCod").classList.add('paymentCodChecked')
    //         document.querySelector("#paymentCod").classList.remove('paymentCodCheck')
    //         alert("All")
    //     })
    // }

    // if (paymentCodChecked) {
    //     paymentCodChecked.addEventListener("click", () => {
    //         document.querySelector("#paymentCod").classList.remove('paymentCodChecked')
    //         document.querySelector("#paymentCod").classList.add('paymentCodCheck')
    //         alert("Ok")
    //     })
    // }

    return (
        <>
            {
                cart.length > 0 ?
                    <section className="checkoutPage">
                        <div className="checkoutPageProducts">
                            {
                                loader ?
                                    <div className="checkoutPageLoader">
                                        <div className="checkoutPageLoaderImgSection">
                                            <img src={spinner} alt="" className="checkoutPageLoaderImg" />
                                        </div>
                                    </div>
                                    :
                                    <div className="checkoutLoader">
                                        <h2>Items</h2>
                                        <br />
                                        {
                                            cart.map(ct =>
                                                <div className="checkoutProduct">
                                                    <img src={ct.img} alt="" className="checkoutProductImg" />
                                                    <div className="checkoutProductText">
                                                        <h5 className="checkoutProductTitle">{ct.name}</h5>
                                                        <h4 style={{ color: "red" }} className="text-danger">Price: {ct.price}</h4>
                                                        <span>Quantity: {ct.quantity}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </div>
                        <div className="checkoutPaymentMethod">
                            <h2>Payment</h2>
                            <br />
                            <form action="">
                                <input id='paymentCod' className="paymentCodCheck" type="checkbox" />
                                <label htmlFor="paymentCod"> Cash on delivery.</label>
                            </form>
                        </div>
                        <div className="">
                            <form className="checkOutForm" onSubmit={handleSubmit(onSubmit)}>
                                <br />
                                <h2 style={{ textAlign: 'center' }}>Place Your Order</h2>
                                <br />
                                <input type='text' name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1" /><br />
                                {
                                    errors.addressLine1 && <span className="checkoutFormErrorText">Address field is required<br /></span>
                                }
                                <input type='text' name="addressLine2" ref={register} placeholder=" Address Line 2" /><br />
                                <input type='text' name="city" ref={register({ required: true })} placeholder="Your City" /><br />
                                {
                                    errors.city && <span className="checkoutFormErrorText">City field is required<br /></span>
                                }
                                <input type='text' name="country" ref={register({ required: true })} placeholder="Your Country" /><br />
                                {
                                    errors.country && <span className="checkoutFormErrorText">Country field is required<br /></span>
                                }
                                <input type='text' name="zipCode" ref={register({ required: true })} placeholder="Your Zip Code" /><br />
                                {
                                    errors.zipCode && <span className="checkoutFormErrorText">Zip code field is required<br /></span>
                                }
                                <input type="submit" value='Place Order' />
                                <br />
                            </form>
                        </div>
                    </section >
                    :
                    <div className="checkOutError">
                        <h3 style={{ textAlign: "center" }} className="">You don't have any products in your cart.</h3>
                    </div>
            }
        </>
    );
};

export default Checkout;