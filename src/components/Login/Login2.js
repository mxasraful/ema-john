import React from 'react';
import './Login.css'
import Auth from "./useAuth"
import Button from '@material-ui/core/Button';


const Login2 = () => {

    const auth = Auth();

    const gSignInHandel = () => {
        auth.singInWithGoogle()
        .then( res => {
            window.location.pathname = '/review'
        })
    }

    return (
        <div>
            {
                auth.user? <div className='isSignedInSection'><h2>You are signed in</h2></div>
                 :<form className="signUpContainer">
                    <Button className="clickToSignInWithGoogle" onClick={gSignInHandel}><img className='loginOptionImg' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQwMCA0MDAiIGhlaWdodD0iNDAwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiB3aWR0aD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0xNDIuOSwyNC4yQzk3LjYsMzkuNyw1OSw3My42LDM3LjUsMTE2LjVjLTcuNSwxNC44LTEyLjksMzAuNS0xNi4yLDQ2LjhjLTguMiw0MC40LTIuNSw4My41LDE2LjEsMTIwLjMgICBjMTIuMSwyNCwyOS41LDQ1LjQsNTAuNSw2Mi4xYzE5LjksMTUuOCw0MywyNy42LDY3LjYsMzQuMWMzMSw4LjMsNjQsOC4xLDk1LjIsMWMyOC4yLTYuNSw1NC45LTIwLDc2LjItMzkuNiAgIGMyMi41LTIwLjcsMzguNi00Ny45LDQ3LjEtNzcuMmM5LjMtMzEuOSwxMC41LTY2LDQuNy05OC44Yy01OC4zLDAtMTE2LjcsMC0xNzUsMGMwLDI0LjIsMCw0OC40LDAsNzIuNmMzMy44LDAsNjcuNiwwLDEwMS40LDAgICBjLTMuOSwyMy4yLTE3LjcsNDQuNC0zNy4yLDU3LjVjLTEyLjMsOC4zLTI2LjQsMTMuNi00MSwxNi4yYy0xNC42LDIuNS0yOS44LDIuOC00NC40LTAuMWMtMTQuOS0zLTI5LTkuMi00MS40LTE3LjkgICBjLTE5LjgtMTMuOS0zNC45LTM0LjItNDIuNi01Ny4xYy03LjktMjMuMy04LTQ5LjIsMC03Mi40YzUuNi0xNi40LDE0LjgtMzEuNSwyNy00My45YzE1LTE1LjQsMzQuNS0yNi40LDU1LjYtMzAuOSAgIGMxOC0zLjgsMzctMy4xLDU0LjYsMi4yYzE1LDQuNSwyOC44LDEyLjgsNDAuMSwyMy42YzExLjQtMTEuNCwyMi44LTIyLjgsMzQuMi0zNC4yYzYtNi4xLDEyLjMtMTIsMTguMS0xOC4zICAgYy0xNy4zLTE2LTM3LjctMjguOS01OS45LTM3LjFDMjI4LjIsMTAuNiwxODMuMiwxMC4zLDE0Mi45LDI0LjJ6IiBmaWxsPSIjRkZGRkZGIi8+PGc+PHBhdGggZD0iTTE0Mi45LDI0LjJjNDAuMi0xMy45LDg1LjMtMTMuNiwxMjUuMywxLjFjMjIuMiw4LjIsNDIuNSwyMSw1OS45LDM3LjFjLTUuOCw2LjMtMTIuMSwxMi4yLTE4LjEsMTguMyAgICBjLTExLjQsMTEuNC0yMi44LDIyLjgtMzQuMiwzNC4yYy0xMS4zLTEwLjgtMjUuMS0xOS00MC4xLTIzLjZjLTE3LjYtNS4zLTM2LjYtNi4xLTU0LjYtMi4yYy0yMSw0LjUtNDAuNSwxNS41LTU1LjYsMzAuOSAgICBjLTEyLjIsMTIuMy0yMS40LDI3LjUtMjcsNDMuOWMtMjAuMy0xNS44LTQwLjYtMzEuNS02MS00Ny4zQzU5LDczLjYsOTcuNiwzOS43LDE0Mi45LDI0LjJ6IiBmaWxsPSIjRUE0MzM1Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yMS40LDE2My4yYzMuMy0xNi4yLDguNy0zMiwxNi4yLTQ2LjhjMjAuMywxNS44LDQwLjYsMzEuNSw2MSw0Ny4zYy04LDIzLjMtOCw0OS4yLDAsNzIuNCAgICBjLTIwLjMsMTUuOC00MC42LDMxLjYtNjAuOSw0Ny4zQzE4LjksMjQ2LjcsMTMuMiwyMDMuNiwyMS40LDE2My4yeiIgZmlsbD0iI0ZCQkMwNSIvPjwvZz48Zz48cGF0aCBkPSJNMjAzLjcsMTY1LjFjNTguMywwLDExNi43LDAsMTc1LDBjNS44LDMyLjcsNC41LDY2LjgtNC43LDk4LjhjLTguNSwyOS4zLTI0LjYsNTYuNS00Ny4xLDc3LjIgICAgYy0xOS43LTE1LjMtMzkuNC0zMC42LTU5LjEtNDUuOWMxOS41LTEzLjEsMzMuMy0zNC4zLDM3LjItNTcuNWMtMzMuOCwwLTY3LjYsMC0xMDEuNCwwQzIwMy43LDIxMy41LDIwMy43LDE4OS4zLDIwMy43LDE2NS4xeiIgZmlsbD0iIzQyODVGNCIvPjwvZz48Zz48cGF0aCBkPSJNMzcuNSwyODMuNWMyMC4zLTE1LjcsNDAuNi0zMS41LDYwLjktNDcuM2M3LjgsMjIuOSwyMi44LDQzLjIsNDIuNiw1Ny4xYzEyLjQsOC43LDI2LjYsMTQuOSw0MS40LDE3LjkgICAgYzE0LjYsMywyOS43LDIuNiw0NC40LDAuMWMxNC42LTIuNiwyOC43LTcuOSw0MS0xNi4yYzE5LjcsMTUuMywzOS40LDMwLjYsNTkuMSw0NS45Yy0yMS4zLDE5LjctNDgsMzMuMS03Ni4yLDM5LjYgICAgYy0zMS4yLDcuMS02NC4yLDcuMy05NS4yLTFjLTI0LjYtNi41LTQ3LjctMTguMi02Ny42LTM0LjFDNjcsMzI4LjksNDkuNiwzMDcuNSwzNy41LDI4My41eiIgZmlsbD0iIzM0QTg1MyIvPjwvZz48L2c+PC9zdmc+" alt="" /><span>Sign In With Google</span></Button>
                    <Button className="clickToSignInWithGoogle" onClick={auth.signedInWithFb}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik01MTIsMjU2YzAsLTE0MS4zODUgLTExNC42MTUsLTI1NiAtMjU2LC0yNTZjLTE0MS4zODUsMCAtMjU2LDExNC42MTUgLTI1NiwyNTZjMCwxMjcuNzc3IDkzLjYxNiwyMzMuNjg1IDIxNiwyNTIuODlsMCwtMTc4Ljg5bC02NSwwbDAsLTc0bDY1LDBsMCwtNTYuNGMwLC02NC4xNiAzOC4yMTksLTk5LjYgOTYuNjk1LC05OS42YzI4LjAwOSwwIDU3LjMwNSw1IDU3LjMwNSw1bDAsNjNsLTMyLjI4MSwwYy0zMS44MDEsMCAtNDEuNzE5LDE5LjczMyAtNDEuNzE5LDM5Ljk3OGwwLDQ4LjAyMmw3MSwwbC0xMS4zNSw3NGwtNTkuNjUsMGwwLDE3OC44OWMxMjIuMzg1LC0xOS4yMDUgMjE2LC0xMjUuMTEzIDIxNiwtMjUyLjg5WiIgc3R5bGU9ImZpbGw6IzE4NzdmMjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMzU1LjY1LDMzMGwxMS4zNSwtNzRsLTcxLDBsMCwtNDguMDIyYzAsLTIwLjI0NSA5LjkxNywtMzkuOTc4IDQxLjcxOSwtMzkuOTc4bDMyLjI4MSwwbDAsLTYzYzAsMCAtMjkuMjk3LC01IC01Ny4zMDUsLTVjLTU4LjQ3NiwwIC05Ni42OTUsMzUuNDQgLTk2LjY5NSw5OS42bDAsNTYuNGwtNjUsMGwwLDc0bDY1LDBsMCwxNzguODljMTMuMDMzLDIuMDQ1IDI2LjM5MiwzLjExIDQwLDMuMTFjMTMuNjA4LDAgMjYuOTY2LC0xLjA2NSA0MCwtMy4xMWwwLC0xNzguODlsNTkuNjUsMFoiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjwvc3ZnPg==" alt="" className="loginOptionImg" /><span>Sign In with Facebook</span></Button>
                    <br />
                    <h2>Log In</h2>
                    <br />
                    <input type="email" className="inputForm inputEmail" placeholder="Your Email" name="name" required /><br />
                    <input type="password" className="inputForm inputPassword" placeholder="Your Password" name="name" required /><br />

                    <div className="submitBtbSection" style={{ display: "flex" }}><input id="createAccountBtn" type="submit" className="submit" value="Create Account" /><p></p></div>
                    <br /><br />
                </form>}
        </div>
    );
};

export default Login2;