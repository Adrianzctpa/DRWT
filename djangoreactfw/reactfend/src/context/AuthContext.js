import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [username, setUsername] = useState(null) 
    const [logstatus, setLogStatus] = useState(false)
    const [tokens, setTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
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
            localStorage.setItem('tokens', JSON.stringify(data))
            setTokens(data)
            navigate("/")
            window.location.reload(false)
        } else {
            alert("No account found with given credentials")
        }       
    }

    const LogOut = (e) => { 
        e.preventDefault()
        
        localStorage.removeItem("tokens")
        setTokens(null)
        navigate("/login/")
        window.location.reload(false)
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
        let response = await fetch("/v1/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokens?.access}`
          }
        })
        let data = await response.json()
        
        if (response.status === 200) {
          setLogStatus(true)
          setUsername(data[0].username)
          setUid(jwt_decode(tokens.access).user_id)
          GetVRooms()
        } else {
          UpdateToken()
        }
    }

    const UpdateToken = async () => {
        let response = await fetch("/v1/token/refresh/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            refresh: tokens?.refresh
            })
        })
        let data = await response.json()
        
        if (response.status === 200) {
            setLogStatus(true)
            localStorage.setItem('tokens', JSON.stringify(data))
            setTokens(data)
            getUsername();
        } else {
            localStorage.removeItem("tokens")
            setTokens(null)
            navigate("/login/")
        }

        if (loading) {
            setLoading(false)
        }
    }
    
    const GetVRooms = async () => {
        let response = await fetch("/v1/getvrooms/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokens?.access}`
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
            getUsername()
        }    
    }, [tokens, loading])

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}