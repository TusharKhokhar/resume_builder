import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './MainHeader.css'
import { AuthContext } from '../AuthContext/AuthContext'
import { useContext } from 'react'
const MainHeader = (props) => {
    
    const authCtx = useContext(AuthContext)
    const history=useHistory()
    const logoutHandler=()=>{
        console.log("logout");
        authCtx.logout()
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink activeClassName="navbar-brand" to='/'>Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink activeClassName='active' className="nav-link " aria-current="page" to='/home'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                               { !authCtx.isLogin ? <NavLink activeClassName='active' className="nav-link" to='/login'>Login</NavLink>:
                                <NavLink  className="nav-link" to='/login' onClick={logoutHandler}>Logout</NavLink>}
                            </li>
                            {!authCtx.isLogin && <li className="nav-item">
                                <NavLink activeClassName='active' className="nav-link" to='/registration'>Registration</NavLink>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default MainHeader