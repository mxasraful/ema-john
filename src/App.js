import React, { useState } from 'react';
import './App.css';
import Shop from './components/Shop/Shop';
import Footer from './components/Reusable/Footer/Footer';
import Header from './components/Reusable/Header/Header'
import Review from './components/Review/Review';
import Error from './components/Error/Error';
import Search from './components/Shop/Search/Search';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { AuthProvider, PrivateRoute } from './components/Login/useAuth';
import Checkout from './components/Checkout/Checkout';
import Inventory from './components/Inventory/Inventory';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [searchedData, setSearchedData] = useState([])

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <div className="mainContent">
            <Switch>
              <Route path="/shop">
                <Search searchedData={searchedData} setSearchedData={setSearchedData} />
                <Shop />
              </Route>
              <Route path="/cart">
                <Review />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/checkout">
                <Checkout />
              </PrivateRoute>
              <Route path='/pt'>
                <Checkout />
              </Route>
              <Route path='/inventory'>
                <Inventory />
              </Route>
              <PrivateRoute path='/profile'>
                <Profile />
              </PrivateRoute>
              <PrivateRoute path='/forgotpassword'>
                <ForgotPassword />
              </PrivateRoute>
              <Route path="/product/:key">
                <ProductDetails />
              </Route>
              <Route exact path="/">
                <Search />
                <Shop />
              </Route>
              <Route exact path="*">
                <Error />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}




//     ________________________________________________________
//    |        ___                                             |
//    |       /   \                                            |
//    |      /     \                                           |
//    |     /  / \  \                                          |
//    |    /  /___\  \                                         |
//    |   /  _______  \                                        |
//    |  /  /       \  \                                       |
//    | /__/         \__\                                      |
//    |________________________________________________________|
export default App;