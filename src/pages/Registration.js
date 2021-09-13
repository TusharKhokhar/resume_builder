import React from 'react'
import { useRef } from 'react'
import './Registration.css'
import { postRequest } from '../Api/Api'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import { useHistory } from 'react-router'

const Registration = (props) => {
  const history=useHistory()
  const inputEmailRef = useRef()
  const inputPasswordRef = useRef()

  const authCtx = useContext(AuthContext)
  const submitHandler = async (e) => {
    e.preventDefault()
    const email = inputEmailRef.current.value
    const password = inputPasswordRef.current.value

    const res = await postRequest(`/accounts:signUp?key=AIzaSyBkuBvnNQ-JSPu648eghCwXrQ2c9oQhP6w`, { email, password, returnSecureToken: true })
    if (res.status == 200) {
      console.log(res);
      authCtx.login(res.data.idToken)
      history.push('/')
    }
    else {
      alert(res.data.error.message)
    }
  }
  return (

    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Register Today</h3>
              <p>Fill in the data below.</p>
              <form className="requires-validation" >

                {/* <div className="col-md-12">
                  <input className="form-control" type="text" name="name" placeholder="Full Name" required />
                  <div className="valid-feedback">Username field is valid!</div>
                  <div className="invalid-feedback">Username field cannot be blank!</div>
                </div> */}

                {/* <div className="col-md-12">
                  <input className="form-control" type="text" name="name" placeholder="Contact no." required />
                  <div className="valid-feedback">Contact no. field is valid!</div>
                  <div className="invalid-feedback">Contact no. field cannot be blank!</div>
                </div> */}

                <div className="col-md-12">
                  <input className="form-control" type="email" name="email" placeholder="E-mail Address" ref={inputEmailRef} required />
                  <div className="valid-feedback">Email field is valid!</div>
                  <div className="invalid-feedback">Email field cannot be blank!</div>
                </div>



                {/* <div className="col-md-12">
                  <select className="form-select mt-3" required>
                    <option selected disabled value="">Position</option>
                    <option value="jweb">Junior Web Developer</option>
                    <option value="sweb">Senior Web Developer</option>
                    <option value="pmanager">Project Manager</option>
                  </select>
                  <div className="valid-feedback">You selected a position!</div>
                  <div className="invalid-feedback">Please select a position!</div>
                </div> */}


                <div className="col-md-12">
                  <input className="form-control" type="password" name="password" placeholder="Password" ref={inputPasswordRef} required />
                  <div className="valid-feedback">Password field is valid!</div>
                  <div className="invalid-feedback">Password field cannot be blank!</div>
                </div>


                {/* <div className="col-md-12 mt-3">
                  <label className="mb-3 mr-1" for="gender">Gender: </label>

                  <input type="radio" className="btn-check" name="gender" id="male" autocomplete="off" required />
                  <label className="btn btn-sm btn-outline-secondary" for="male">Male</label>

                  <input type="radio" className="btn-check" name="gender" id="female" autocomplete="off" required />
                  <label className="btn btn-sm btn-outline-secondary" for="female">Female</label>

                  <input type="radio" className="btn-check" name="gender" id="secret" autocomplete="off" required />
                  <label className="btn btn-sm btn-outline-secondary" for="secret">Other</label>
                  <div className="valid-feedback mv-up">You selected a gender!</div>
                  <div className="invalid-feedback mv-up">Please select a gender!</div>
                </div> */}

                {/* <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label">I confirm that all data are correct</label>
                  <div className="invalid-feedback">Please confirm that the entered data are all correct!</div>
                </div> */}


                <div className="form-button mt-3">
                  <button id="submit" type="submit" className="btn btn-primary" onClick={submitHandler}>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default Registration