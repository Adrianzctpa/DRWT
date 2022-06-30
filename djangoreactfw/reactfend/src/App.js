import React, {useContext} from "react";
import GeneralContext from './context/GeneralContext'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import SelectVRoom from "./components/VRooms/SelectVRoom.js"
import CreateVRoom from "./components/VRooms/CreateVRoom.js"
import VideoRoom from "./components/VRooms/VideoRoom.js"

const App = () => {
 
  const {logstatus, loading} = useContext(GeneralContext)

  return (
    <>
      {!loading ?
          <>
            <Navbar log={logstatus}/>
            <Routes>
              {!logstatus ? 
                <>
                  <Route path='' element={<Home />} />
                  <Route path="login/" element={<Login />} />
                  <Route path="register/" element={<Register />} />
                </> : (
                <>
                  <Route path='' element={<Home />} />
                  <Route path="login/" element={<Login />} />
                  <Route path="selectvroom/" element={<SelectVRoom />} />
                  <Route path="videoroom/:uuid/" element={<VideoRoom />} />
                  <Route path="createvroom/" element={<CreateVRoom />} />
                  <Route path="createvroom/:uuid/" element={<CreateVRoom />} />
                </>)  
              }
            </Routes>
          </> : (
            <>
              <p>Loading your content....</p>
            </>
          )
      }
    </>  
  )
}

export default App;