import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import jwt_decode from "jwt-decode"
import Home from './components/Home.js'
import Login from "./components/Login.js"

const App = () => {
  // States
  const [username, setUsername] = useState(null) 
  const [logstatus, setLogStatus] = useState(false)
  const [tokens, setTokens] = useState({
    access: "", refresh: ""
  })
  const [uid, setUid] = useState(null)
  //

  //basic auth code
  const AuthCheck = () => {
    if (localStorage.getItem("refresh") !== null) {
      setTokens({
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh")
      })
      setUid(jwt_decode(JSON.stringify(localStorage.getItem("access"))).user_id)
      setLogStatus(true)
    }
  }

  const getUsername = async () => {
    let ac = localStorage.getItem("access")
    let userid = jwt_decode(JSON.stringify(ac)).user_id

    let response = await fetch("/v1/users/" + userid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ac}`
      }
    })
    
    let data = await response.json()
    if (response.status === 200) {
      setUsername(data.username)
    } else {
      UpdateToken()
    }
  }

  const UpdateToken = async () => {
    let rt = localStorage.getItem("refresh")
    let response = await fetch("/v1/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: rt
      })
    })

    let data = await response.json()
    if (response.status === 200) {
      setTokens({access: data.access, refresh: data.refresh})
      localStorage.setItem('access',  data.access)
      localStorage.setItem('refresh', data.refresh)
      console.log("tokens refreshed!")
      getUsername();
    } else {
      setTokens({access: null, refresh: null})
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      console.log("removing..")
    }
  }
  //

  useEffect(() => {
    AuthCheck();
    getUsername();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='' element={<Home log={logstatus} name={username} />} />
        <Route path="login" element={<Login log={logstatus} />} /> 
      </Routes>  
    </Router>
  )
}

export default App;