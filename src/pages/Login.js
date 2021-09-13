import React from 'react'
import loginImage from '../images/login.jpg'
import logo from '../images/logo.svg'
import './login.css'
import { NavLink, useHistory } from 'react-router-dom'
import { postRequest } from '../Api/Api'
import { useRef } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'

const Login = (props) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const history=useHistory()
  const authCtx=useContext(AuthContext)

  const onClickHandler = async () => {

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const res = await postRequest('/accounts:signInWithPassword?key=AIzaSyBkuBvnNQ-JSPu648eghCwXrQ2c9oQhP6w', { email, password, returnSecureToken: false })
    if (res.status == 200) {
      console.log(res);
      authCtx.login(res.data.idToken)
      history.replace('/')
    }
    else {
      alert(res.data.error.message)
    }
  }

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={loginImage} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={logo} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Sign into your account</p>
                <form >
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef} className="form-control" placeholder="Email address" />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef} className="form-control" placeholder="***********" />
                  </div>
                  <input name="login" id="login" className="btn btn-block login-btn mb-4" type="button" value="Login" onClick={onClickHandler} />
                </form>
                <a href="#!" className="forgot-password-link">Forgot password?</a>
                <p className="login-card-footer-text">Don't have an account? <NavLink to='/registration' className="text-reset">Register here</NavLink></p>
                <nav className="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

}

export default Login