import React from 'react';
import './signup.css'

const Signup = () => {
    return (
        <form className="signUpContainer">
            <br/>
            <h2>Create Account</h2>
            <br/>
            <input type="name" className="inputForm inputName" placeholder="Your Name" name="name" required/><br/>
            <input type="email" className="inputForm inputEmail" placeholder="Your Email" name="name" required/><br/>
            <input type="password" className="inputForm inputPassword" placeholder="Your Password" name="name" required/><br/>
            <input id="createAccountBtn" type="submit" className="submit" value="Create Account"/>
            <br/><br/>
        </form>
    );
};

export default Signup;