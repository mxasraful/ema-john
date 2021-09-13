import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../Login/useAuth';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const auth = useAuth()
    const [sendEmail, setSendEmail] = useState(false)

    const divStyle = {
        width: '300px',
        margin: '0 auto',
        marginTop: '50px',
        marginBottom: '50px',
        padding: '20px',
        border: '1px solid #aaa',
        borderRadius: '7px'
    }

    const handelSubmit = (e) => {
        auth.forgotPassword(email)
            .then(res => {
                setSendEmail(true)
            })
            .catch(err => {
                console.log(err)
            })
        e.preventDefault()
        e.target.reset()
    }

    return (
        <div style={divStyle}>
            {
                sendEmail ?
                    <div className="resetLinkSended">
                        <h3>We are send a reset link on your email : {email}</h3>
                    </div> :
                    <form onSubmit={handelSubmit} noValidate autoComplete="off">
                        <h4>Reset Your Password</h4>
                        <br />
                        <TextField style={{ width: '100%' }} type='email' onChange={(e) => setEmail(e.target.value)} id="standard-basic" label="Your Email" required />
                        <br /><br />
                        <Button type='submit' variant="contained" color="primary">Send Reset Email</Button>
                    </form>
            }
        </div >
    );
};

export default ForgotPassword;