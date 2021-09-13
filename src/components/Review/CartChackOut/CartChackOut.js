import React from 'react';

const CartChackOut = (props) => {
    function round(property) {
        const rounding = property.toFixed(2);
        return (rounding)
    };
    const cart = props.pd;
    console.log("Chacks" , props.pd)

    const TotalPrice = cart.reduce((total , prod) => total + prod.price * prod.quantity , 0)
    let shipping = 0;
    if(TotalPrice < 15){
        shipping = 0;
    }else if(TotalPrice > 0){
        shipping = 12.99;
    }else if(TotalPrice > 15){
        shipping = 9.99;
    }

    const estimateTax = TotalPrice / 10;
    const totalPriceRounded = round(shipping + TotalPrice + estimateTax)

    console.log("Chack" , TotalPrice)
    return (
        <div>
            <h3>Check out</h3>
            <li style={{color: "#ff5000" , fontSize: "20px" , textAlign: "center"}}>
                Total Ordered Items: <b style={{color: "#000000"}}>{props.pd.length}</b>
            </li>
            <li> Shipping charge:<strong>$ {shipping}</strong></li>
            <li><small>Before shipping and tax:<strong>$ {round(TotalPrice)}</strong></small></li>
            <li>Estimate Tax:<strong>$ {round(estimateTax)}</strong></li>
            <li className="cartTotalPrice">Total Price:<strong>$ {totalPriceRounded}</strong></li>
            <button id="add_to_cart">
                Please Check out
            </button>
        </div>
    );
};

export default CartChackOut;