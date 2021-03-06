import React from 'react';
import { Link } from 'react-router-dom';

const Search = (props) => {

    return (
        <div className="searchBar_and_cart bg-dark">
            <div className="searchBar_and_cart_option container">
                <div className="col-9 d-flex" style={{ margin: '0 auto' }}>
                    <div className="col-11">
                        <form class="row">
                            <div class="col-10 mt-3">
                                <input type="text" class="form-control form-control-sm" id="" placeholder="Search" />
                            </div>
                            <div class="col-2 mt-3">
                                <button type="submit" class="btn btn-primary mb-3 btn-sm">Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-1 mt-3">
                        <Link to="/cart" className="searchCart text-light link-item">
                            <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-cart-fill cart_img" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                            <span id="cart_item_amount">0</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Search;