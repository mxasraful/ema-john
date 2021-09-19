import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Button from '@material-ui/core/Button';
import StripeCard from './StripeCard/StripeCard';

// Stripe 
const stripePromise = loadStripe("pk_test_51IdfRoF1fXyFzjChI92Hjve7nRNhNen4D35kH4kxQCJ3KHWY8jEPPN05nmjIhCNyCdBjYA0euNJx9RyPau1PDv7F00B0qN62u5");


const Payment = () => {

    const [cardPayment, setCardPayment] = useState(false)
    const [paypalPayment, setPaypalPayment] = useState(false)

    // Handle payment submit
    const paymentHandle = () => {
        const cardPaymentChecked = document.querySelector("#paymentOptionCard")
        const paypalPaymentChecked = document.querySelector("#paymentOptionPaypal")

        if (cardPaymentChecked.checked === true) {
            setCardPayment(true)
            setPaypalPayment(false)
        } else {
            setCardPayment(false)
        }
        if (paypalPaymentChecked.checked === true) {
            setPaypalPayment(true)
            setCardPayment(false)
        } else {
            setPaypalPayment(false)
        }
    }


    return (
        <div className="paymentPage">
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h4>Payment</h4>
                    </div>
                    <form className="paymentOptions mt-4">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="paymentOptionPaypal" onClick={paymentHandle} />
                            <label class="form-check-label" for="paymentOptionPaypal">Paypal</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="paymentOptionCard" onClick={paymentHandle} />
                            <label class="form-check-label" for="paymentOptionCard">Credit Or Debit</label>
                        </div>
                    </form>
                    {
                        paypalPayment &&
                        <div className="card mt-3">
                            <div className="text-center card-body">
                                <div className="mb-4">
                                    <h6>Pay With Paypal</h6>
                                </div>
                                <Button size="small" variant="outlined" color="primary" className="w-100">Pay Now</Button>
                            </div>
                        </div>
                    }
                    {
                        cardPayment ?
                            <div className="card mt-3">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <h6>Card Information</h6>
                                    </div>
                                    <Elements stripe={stripePromise}>
                                        <StripeCard />
                                    </Elements>
                                </div>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    );
};

export default Payment;