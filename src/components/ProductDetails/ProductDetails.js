import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import spinner from './../../Spinner/spinner.gif';
import './ProductDetails.css';

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const [dataOk, setDataOk] = useState(false)
    
    const { key } = useParams();

    // Get product info from db
    useEffect(() => {
        fetch(`http://localhost:3001/product/${key}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setDataOk(true)
            })
    }, [key])

    console.log(product)
    return (
        <div className="container productFullDetails">
            {
                dataOk ?
                    <div className="productDetail row mt-5 mb-5">
                        <div className="productDetailLeft col-sm-4">
                            <img className="productDetailImg w-100" src={product.img} alt="" />
                        </div>
                        <div className="productDetailRight col-sm-8">
                            <h3 className="productDetailTitle">{product.name.slice(0, 100)}...</h3>
                            <div className="productDetailSellerPriceAndFeatures row mt-4">
                                <div className="productDetailSellerAndPrice col-3">
                                    <h6 className="productDetailSeller">By: <strong>{product.seller}</strong></h6>
                                    <h6 className="productDetailPrice">Price: $<strong>{product.price}</strong></h6>
                                </div>
                                <div className="productDetailRating col-9">
                                    {
                                        product.features.length > 0 ?
                                            <div className='productsDetailsFeatures'>
                                                <h4 className='productsDetailsFeaturesTitle'>Features:</h4>
                                                <div className="productsDetailsFeaturesValue d-flex">
                                                    <ul className="productsDetailsFeaturesValueLeft">
                                                        {
                                                            product.features.map(pd =>
                                                                <li>{pd.description}</li>
                                                            )
                                                        }
                                                    </ul>
                                                    <ul className="productsDetailsFeaturesValueRight">
                                                        {
                                                            product.features.map(pd =>
                                                                <li><strong>: </strong> {pd.value}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>
                            <Button className="mt-4 button px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                </svg>
                                <span className="ms-2">Add To Cart</span>
                            </Button>
                        </div>
                    </div> :
                    <div className="shopLoader text-center mt-4" style={{ paddingTop: "23vh", paddingBottom: "25vh" }}>
                        <div className="shopSpinnerImg">
                            <img style={{ width: "60px" }} src={spinner} alt="" />
                        </div>
                    </div>
            }
        </div>
    );
};

export default ProductDetails;