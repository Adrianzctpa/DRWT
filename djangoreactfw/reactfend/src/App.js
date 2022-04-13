import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from  './components/Register.js'
import SelectVRoom from "./components/VRooms/SelectVRoom.js"
import CreateVRoom from "./components/VRooms/CreateVRoom.js"
import VideoRoom from "./components/VRooms/VideoRoom.js"

const App = () => {
  // States
  const [username, setUsername] = useState(null) 
  const [logstatus, setLogStatus] = useState(false)
  const [tokens, setTokens] = useState({
    access: "", refresh: ""
  })
  const [vrooms, setVrooms] = useState([])
  //

  //basic auth code
  const AuthCheck = () => {
    if (localStorage.getItem("refresh") !== null) {
      setTokens({
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh")
      })
      setLogStatus(true)
    }
  }

  const getUsername = async () => {
    let ac = localStorage.getItem("access")
    let response = await fetch("/v1/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ac}`
      }
    })
    let data = await response.json()
    
    if (response.status === 200) {
      setUsername(data[0].username)
      GetVRooms()
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

  // Get VideoRooms
  const GetVRooms = async () => {
    let ac = localStorage.getItem("access")
    let response = await fetch("/v1/vroomset", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ac}`
        }
    })
    let data = await response.json()
    
    if (response.status === 200) {
      setVrooms(data)
    }
  }
  //

  //generate vrooms route
  const RouteLoop = []
  vrooms.forEach((e) => {
    RouteLoop.push({
      pathname: `videoroom/${e.uuid}/`,
      info: e})
  })

  const RouteComponents = [];
  for (var i = 0; i < RouteLoop.length; i++) {
    RouteComponents.push(
      <Route path={RouteLoop[i].pathname} element={<VideoRoom ac={tokens.access} uuid={RouteLoop[i].uuid} info={RouteLoop[i].info} />} />
    )
  }
  //

  useEffect(() => {
    AuthCheck();
    getUsername();
  },[])

  return (
    <Router>
      <Routes>
        {logstatus ? 
        <>
          { RouteComponents }
          <Route path='' element={<Home log={logstatus} name={username} />} />
          <Route path="login" element={<Login log={logstatus} />} />
          <Route path="selectvroom" element={<SelectVRoom vrooms={vrooms} />} />
          <Route path="videoroom/:uuid/" element={<VideoRoom />} />
          <Route path="createvroom" element={<CreateVRoom ac={tokens.access} />} />
        </> : (
        <>
          <Route path='' element={<Home log={logstatus} name={username} />} />
          <Route path="login" element={<Login log={logstatus} />} />
          <Route path="register" element={<Register />} />
        </>)
        }
      </Routes>  
    </Router>
  )
}

export default App;