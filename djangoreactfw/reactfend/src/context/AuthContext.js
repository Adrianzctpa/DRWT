import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [username, setUsername] = useState(null) 
    const [logstatus, setLogStatus] = useState(false)
    const [tokens, setTokens] = useState({
    access: "", refresh: ""
    })
    const [vrooms, setVrooms] = useState([])
    const [uid, setUid] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const LogIn = async (e) => {
        e.preventDefault();

        let response = await fetch("/v1/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
        
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            
            setLogStatus(true)
            setTokens({
                access: data.access, refresh: data.refresh
            })
            
            console.log("made tokens!")
            navigate("/")
            window.location.reload(false)
        } else {
            alert("No account found with given credentials")
        }       
    }

    const LogOut = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setTokens({
            access: "",  refresh: ""
        })
        console.log("removed.")
    }

    const Register = async (e) => {
        e.preventDefault();

        let response = await fetch("/v1/createusers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'name': e.target.name.value,
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            navigate('/login/')
        } else {
            alert('Something went wrong. Please try again.')
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
          setUid(jwt_decode(ac).user_id)
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
            setLogStatus(true)
            setTokens({access: data.access, refresh: data.refresh})
            localStorage.setItem('access',  data.access)
            localStorage.setItem('refresh', data.refresh)
            console.log("tokens refreshed!")
            getUsername();
        } else {
            LogOut()
        }

        if (loading) {
            setLoading(false)
        }
    }
    
    const GetVRooms = async () => {
        let ac = localStorage.getItem("access")
        let response = await fetch("/v1/getvrooms/", {
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

    let context = {
        username: username,
        tokens: tokens,
        logstatus: logstatus,
        uid: uid,
        vrooms: vrooms,
        login: LogIn,
        logout: LogOut,
        register: Register,
    } 

    useEffect(() => {
        if (loading) {
            UpdateToken()
        }    
    }, [tokens, loading])

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}