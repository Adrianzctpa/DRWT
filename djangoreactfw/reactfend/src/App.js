import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login  from "./components/Login.js"


const App = () => {
  const [username, setUsername] = useState(null) 
  const [logstatus, setLogStatus] = useState(false)

  return (
    <Router>
      <Routes>
        {
          logstatus ? 
            <h5>Ur authenticated! Pogchamp</h5> : (
            <Route path="login" element={<Login />}/>
          )
        }
      </Routes>  
    </Router>
  )
}

export default App;