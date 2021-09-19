import React, { createContext, useState, useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Route } from 'react-router-dom';
import jwtDecode from "jwt-decode";

firebase.initializeApp(firebaseConfig)


// Create context
const AuthContext = createContext();
// Create provider
export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
// Context
export const useAuth = () => useContext(AuthContext);


// Filter user info function
const getUser = user => {
    const { displayName, email, photoURL, emailVerified } = user;
    return { name: displayName, email, photo: photoURL, verified: emailVerified }
}


// Privet route for validate user function
export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (auth.user || sessionStorage.getItem("userToken")) ? (
                    children
                ) : (
                    window.location.replace(`/login?for=${rest.location.pathname}`)
                )
            }
        />
    );
}

// Main authentication function
const Auth = () => {
    const [user, setUser] = useState(null)
    const [storedTrue, setStoredTrue] = useState(false)
    const forgotSuccessMessage = useState(null)
    const forgotErrorMessage = useState(null)

    // Url query for redirect page
    const query = window.location?.search?.split('=')[1]


    // SignIn user with google function
    const singInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                storeLoggedInUserData()
                setUser(getUser(res.user))
                return (res.user)
            })
            .catch(err => {
                setUser(null)
                return (err.message)
            })
    }

    // SignIn user with facebook function
    const signInWithFb = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const user = getUser(res.user);
                setUser(user)
                storeLoggedInUserData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // SignUp user with password function
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
                        storeLoggedInUserData()
                        return res.user
                    })
            })
            .catch(err => {
                setUser(null)
                return user.message
            });
    }

    // SignIn user with password function
    const signInWithPass = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const signedUser = getUser(res.user)
                storeLoggedInUserData()
                setUser(signedUser)
                return user
            })
            .catch(err => {
                setUser(null)
                return user.message
            });
    }

    // Verify user email function
    const emailVerification = () => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then((res) => {

            })
            .catch((error) => {

            });
    }

    // Forgot user password function
    const forgotPassword = (email) => {
        return firebase.auth().sendPasswordResetEmail(email)
            .then((res) => {
                return res
            }).catch((err) => {
                return err.message
            });
    }

    // User sign out function
    const singOut = () => {
        firebase.auth().signOut()
            .then(res => {
                sessionStorage.removeItem("userToken")
                setUser(null)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    // Store logged in user data
    const storeLoggedInUserData = () => {
        setStoredTrue(false)
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem("userToken", idToken)
                setStoredTrue(true)
            }).catch(function (error) {

            });
    }

    // Reload for get user
    useEffect(() => {
        if (window.location.pathname === '/login') {
            if (sessionStorage.getItem("userToken")) {
                if (query) {
                    window.location.replace(query)
                } else {
                    window.location.replace('/')
                }
            }
        }
    }, [storedTrue])

    // Get logged in user
    useEffect(() => {
        if (sessionStorage.getItem('userToken')) {
            const { name, email, picture, email_verified } = jwtDecode(sessionStorage.getItem('userToken'))
            setUser({ name, photo: picture, email, verified: email_verified })
            console.log({ name, photo: picture, email, verified: email_verified })
        } else {
            console.log("Null")
        }
    }, [])

    // const tokenUser = jwtDecode(sessionStorage.getItem('userToken')
    // setUser({ name: tokenUser.name, photo: tokenUser.picture, email: tokenUser.email, verified: tokenUser.emailVerified })

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