import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import firebaseConfig from '../../firebase.config';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

firebase.initializeApp(firebaseConfig)

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

const getUser = user => {
    const { displayName, email, photoURL, emailVerified } = user;
    return { name: displayName, email, photo: photoURL, verified: emailVerified }
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/loginForCheckout",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}
const Auth = () => {
    const [user, setUser] = useState(null)

    const singInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedUser = getUser(res.user)
                setUser(signedUser)
                return (res.user)
            })
            .catch(err => {
                console.log(err)
                setUser(null)
                return (err.message)
            })
    }
    const signInWithFb = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const user = res.user;
                console.log(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const signUpWithPass = (name, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                    photoURL: 'https://www.w3schools.com/w3images/avatar2.png'
                })
                    .then(() => {
                        emailVerification()
                        const signedUser = getUser(res.user)
                        setUser(signedUser)
                        return res.user
                    })
            })
            .catch(err => {
                setUser(null)
                return user.message
            });
    }

    const signInWithPass = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const signedUser = getUser(res.user)
                setUser(signedUser)
                return user
            })
            .catch(err => {
                setUser(null)
                return user.message
            });
    }


    const emailVerification = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {

        }).catch(function (error) {

        });
    }

    const forgotSuccessMessage = useState(null)
    const forgotErrorMessage = useState(null)

    const forgotPassword = (email) => {
        return firebase.auth().sendPasswordResetEmail(email).
            then((res) => {
                return res
            }).catch((err) => {
                return err.message
            });
    }

    const singOut = () => {
        firebase.auth().signOut()
            .then(res => {
                setUser(null)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                const currentUser = getUser(usr)
                setUser(currentUser)
            } else {

            }
        });
    }, [])

    return {
        user,
        forgotSuccessMessage,
        forgotErrorMessage,
        singInWithGoogle,
        signInWithFb,
        signUpWithPass,
        forgotPassword,
        signInWithPass,
        singOut,
    };
};

export default Auth;