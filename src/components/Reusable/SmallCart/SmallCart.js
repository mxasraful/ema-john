import React from 'react';
import './SmallCart.css';

const SmallCart = (props) => {
    function round(property) {
        const rounding = property.toFixed(2);
        return (rounding)
    }

    const cart = props.orderedItems;

    const orderTotal = cart.reduce((orderTotal, product) => orderTotal + product.price * product.quantity, 0)
    
    let shipping = 0;
    if (orderTotal < 15) {
        shipping = 0;
    } else if (orderTotal > 0) {
        shipping = 12.99;
    } else if (orderTotal > 15) {
        shipping = 9.99;
    }

    const estimateTax = orderTotal / 10;

    let TotalTaxBeforeShippingAndTax = orderTotal;
    
    const fullPrice = round(orderTotal + shipping + estimateTax)
    return (
        <div className="cartOption">
            <h2 id="order_summary">Order Summary</h2>
            <p id="ordered_items">Ordered Items: <b> {props.orderedItems.length}</b></p><br />
            <span id="shipping">Shipping: <b>$ {shipping}</b></span><br />
            <span id="Total_tax_before_shipping_and_tax"><small>Before shipping and tax:</small><b>$ {round(TotalTaxBeforeShippingAndTax)}</b></span><br />
            <span>Estimate Tax: <b>$ {round(estimateTax)}</b></span><br />
            <h4 className="cartTotalPrice">Order Total: <b>$ {fullPrice}</b></h4><br />
            {
                props.children
            }
        </div>
    );
};

export default SmallCart;