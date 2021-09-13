import React from 'react'
import './Progressbar.css'


const Progressbar = (props) => {
    const { step } = props
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mb-2">
                    <div className="card px-0 pt-2 pb-0 mt-3 mb-3">
                        <p>Fill all form field to go to next step</p>
                        <form id="msform">
                            <ul id="progressbar">
                                <li  className={step>=1? 'active': ''} id="account"><strong>Personal info</strong></li>
                                <li className={step>=2? 'active': ''} id="personal"><strong>Experience</strong></li>
                                <li className={step>=3? 'active': ''} id="payment"><strong>Education</strong></li>
                                <li className={step>=4? 'active': ''} id="confirm"><strong>Skills</strong></li>
                                <li className={step>=5? 'active': ''} id="confirm"><strong>Summray</strong></li>
                                {/* <li id="confirm"><strong>Summray</strong></li> */}

                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Progressbar