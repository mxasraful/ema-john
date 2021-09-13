import React, { useState, useEffect } from 'react';
import spinner from "./../../Spinner/spinner.gif";
import spinner2 from "./../../Spinner/spinner_2.gif";
import './shop.css'
import Product from '../Reusable/Product/Product';
import SmallCart from '../Reusable/SmallCart/SmallCart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from './../../utilities/databaseManager';
import Button from '@material-ui/core/Button';

const Shop = () => {

  const [productsData, setProductsData] = useState([])
  const [dataOk, setDataOk] = useState(false)
  const [loadMoreText, setLoadMoreText] = useState(true)
  const [limit, setLimit] = useState(12)
  const [productsLimitOver, setProductsLimitOver] = useState(false)
  const [orderedItems, inOrderedItems] = useState([]);

  const productsDt = productsData.slice(0, limit)


  // Load product from database
  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then(res => res.json())
      .then(data => {
        setProductsData(data)
        setDataOk(true)
      })
  }, [])


  // Cart products management
  useEffect(() => {
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    if (productsData.length) {
      const previousCart = productKeys.map(existingKey => {
        const product = productsData.find(pd => pd.key === existingKey)
        product.quantity = savedCart[existingKey]
        return product;
      })
      inOrderedItems(previousCart)
    }
  }, [productsData])


  // Add products in cart 
  const clickAddToCartBtn = (AddToCartBtnWork) => {
    const toBeAddedKey = AddToCartBtnWork.key;
    console.log(AddToCartBtnWork)
    const sameProduct = orderedItems.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;

    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = orderedItems.filter(pd => pd.key !== toBeAddedKey)
      newCart = [...others, sameProduct]
      console.log('asolkljksd', others)
    } else {
      AddToCartBtnWork.quantity = 1;
      newCart = [...orderedItems, AddToCartBtnWork]
    }
    inOrderedItems(newCart)
    addToDatabaseCart(AddToCartBtnWork.key, count)
  }


  // Load more products
  const loadMoreProducts = () => {
    setLoadMoreText(false)
    const limitForSet = limit * 2
    setLimit(limitForSet)
    setLoadMoreText(true)
    productsLimitCheck()
  }


  // Products limit management
  const productsLimitCheck = () => {
    if (productsData.length <= limit) {
      setProductsLimitOver(true)
    } else {
      setProductsLimitOver(false)
    }
  }

  return (
    <div id="shopPage" className="container">
      <div className="row">
        <div className="col-9 mt-5" style={{ borderRight: "1px solid #C8C9CA" }}>
          {dataOk ?
            <>
              {
                productsDt.map(products =>
                  <Product
                    key={products.key}
                    ShowHideAddToCartBtn={true}
                    product={products}
                    clickAddToCartBtn={clickAddToCartBtn}
                  ></Product>
                )
              }
              {
                productsLimitOver ? ""
                  :
                  <div className="shopLoadMoreProducts text-center">
                    <Button onClick={loadMoreProducts} className="btn shopLoadMoreProductsBtn px-4 mt-4 mb-4">
                      {
                        loadMoreText ?
                          <span className="shopLoadMoreProductsBtnText">Load More Products</span>
                          :
                          <span className="shopLoadMoreProductsBtnSpinner"><img src={spinner2} alt="" /></span>
                      }
                    </Button>
                    <br />
                  </div>
              }
            </>
            :
            <div className="shopLoader text-center mt-4" style={{ paddingTop: "23vh", paddingBottom: "25vh" }}>
              <div className="shopSpinnerImg">
                <img style={{ width: "60px" }} src={spinner} alt="" />
              </div>
            </div>
          }
        </div>
        <div className="smallProductSection col-3">
          <SmallCart orderedItems={orderedItems}>
            <div className="text-center">
              <Link to="/cart">
                <Button className="px-4" id="add_to_cart" style={{ marginLeft: "8px", fontSize: '13px', padding: '5px 25px' }}> Review Your Order</Button>
              </Link>
            </div>
          </SmallCart>
        </div>
      </div>
    </div >
  );
};

export default Shop;