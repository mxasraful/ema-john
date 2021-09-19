import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';

const StripeCard = () => {

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const stripe = useStripe()
    const elements = useElements();

    const handleCardSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (

        <form action="" onSubmit={handleCardSubmit}>
            <CardElement />
            <div className="text-center">
                <Button type="submit" size="small" variant="outlined" color="secondary" className="mt-4 w-100" disabled={!stripe}>Pay</Button>
            </div>
        </form>
    );
};

export default StripeCard;