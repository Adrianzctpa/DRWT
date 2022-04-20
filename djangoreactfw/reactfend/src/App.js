import React, { useContext } from "react";
import { Route, Routes} from 'react-router-dom'
import AuthContext from './context/AuthContext.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from  './components/Register.js'
import SelectVRoom from "./components/VRooms/SelectVRoom.js"
import CreateVRoom from "./components/VRooms/CreateVRoom.js"
import VideoRoom from "./components/VRooms/VideoRoom.js"

const App = () => {
  const context = useContext(AuthContext)
  
  const RouteLoop = []
  context.vrooms.forEach((e) => {
    RouteLoop.push({
      pathname: `videoroom/${e.uuid}/`,
      info: e,
      uid: e.uid})
  })

  const RouteComponents = [];
  for (var i = 0; i < RouteLoop.length; i++) {
    RouteComponents.push(
      <Route path={RouteLoop[i].pathname} 
      element={<VideoRoom uid={RouteLoop[i].uid} 
      info={RouteLoop[i].info} ac={context.tokens.access} />} 
      />
    )
  }
 

  return (
    <Routes>
      {context.logstatus ? 
        <>
          { RouteComponents }
          <Route path='' element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="selectvroom/" element={<SelectVRoom />} />
          <Route path="videoroom/:uuid/" element={<VideoRoom />} />
          <Route path="createvroom" element={<CreateVRoom />} />
        </> : (
        <>
          <Route path='' element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </>)
      }
    </Routes>
  )
}

export default App;