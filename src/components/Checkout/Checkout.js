import React, { useEffect, useState } from 'react';
import './Checkout.css';
import spinner from './../../Spinner/spinner_2.gif'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Button from '@material-ui/core/Button';
import Payment from './Payment/Payment';

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
            })
    }, [])

    return (
        <>
            {
                cart.length > 0 ?
                    <section className="checkoutPage mt-4 container">
                        <div className="row mb-4">
                            <div className="col-sm-7">
                                <div className="checkoutPageProducts card" style={{ minHeight: "60vh" }}>
                                    <div className="card-body">
                                        {
                                            loader ?
                                                <div className="shopLoader text-center mt-4" style={{ paddingTop: "23vh", paddingBottom: "25vh" }}>
                                                    <div className="shopSpinnerImg">
                                                        <img style={{ width: "60px" }} src={spinner} alt="" />
                                                    </div>
                                                </div>
                                                :
                                                <div className="checkoutLoader">
                                                    <h4>Items</h4>
                                                    <br />
                                                    {
                                                        cart.map(ct =>
                                                            <div className="card bg-light mb-3">
                                                                <div className="card-body">
                                                                    <div className="checkoutItem row">
                                                                        <div className="col-3">
                                                                            <img src={ct.img} alt="" className="checkoutProductImg img-fluid" />
                                                                        </div>
                                                                        <div className="checkoutItemText col-9">
                                                                            <h5 className="checkoutProductTitle">{ct.name}</h5>
                                                                            <h4 style={{ color: "red" }} className="text-danger">Price: ${ct.price}</h4>
                                                                            <span>Quantity: {ct.quantity}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="card" style={{ minHeight: "60vh" }}>
                                    <div className="card-body">
                                        <form className="checkOutForm" onSubmit={handleSubmit(onSubmit)}>
                                            <h4 style={{ textAlign: 'center' }}>Address</h4>
                                            <br />
                                            <input className="" type='text' name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1" /><br />
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
                                            <div className="text-center">
                                                <Button className="px-4 button mt-4" variant="outlined" type="submit">
                                                    <span>Submit address</span>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                    </svg> */}
                                                </Button>
                                            </div>
                                            <br />
                                        </form>
                                    </div>
                                </div>
                                <div className="card mt-4 pb-5">
                                    <div className="card-body">
                                        <Payment />
                                    </div>
                                </div>
                            </div>
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