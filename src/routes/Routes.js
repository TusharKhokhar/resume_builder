import React from 'react'
import { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContext'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Registration from '../pages/Registration'

const Routes = (props) => {
    const authCtx = useContext(AuthContext)
    return (
        <Switch>
            <Route path='/' exact >
                <Redirect to='/home' />
            </Route>
            <Route path='/home'>
                <Home />
            </Route>
            {!authCtx.isLogin && <Route path='/login'>
                <Login />
            </Route>}
            {!authCtx.isLogin && <Route path='/registration'>
                <Registration />
            </Route>}
            {authCtx.isLogin && <Route path='/layout'>
                <Layout />
            </Route>}
            <Route path='*' >
                <Redirect to='/home' />
            </Route>
        </Switch>
    )

}

export default Routes