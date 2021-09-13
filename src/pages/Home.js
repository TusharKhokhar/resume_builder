import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import DefaultHome from '../components/DefaultHome'
import ResumeForm from '../components/ResumeForm/ResumeForm'
const Home = (props) => {
  const authCtx=useContext(AuthContext)
  if(authCtx && authCtx.isLogin){
    return <ResumeForm/>
  }
  else{
    return <DefaultHome/>
  }
}

export default Home