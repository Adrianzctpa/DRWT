import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [username, setUsername] = useState(null) 
    const [tokens, setTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
    const [vrooms, setVrooms] = useState([])
    const [uservrooms, setUserVrooms] = useState([])
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
            setTokens(JSON.parse(localStorage.getItem('tokens')))
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
    }

    const RegisterUser = async (e) => {
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
          setUsername(data.results[0].username)
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
            'refresh': tokens?.refresh
            })
        })
        let data = await response.json()
        
        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify(data))
            setTokens(JSON.parse(localStorage.getItem('tokens')))
            getUsername()
        } else {
            localStorage.removeItem("tokens")
            setTokens(null)
            navigate('/')
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
            data.id = 'Vrooms'
            setVrooms(data)
            getUserVrooms()
        }
    }

    const getUserVrooms = async () => {
        let response = await fetch("/v1/vroomset/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokens?.access}`
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            data.id = 'UVrooms'
            setUserVrooms(data)
        }

        if (loading) {
            setLoading(false)
        }
    }

    const context = {
        username: username,
        tokens: tokens,
        loading: loading,
        uid: uid,
        vrooms: vrooms,
        uvrooms: uservrooms,
        login: LogIn,
        logout: LogOut,
        register: RegisterUser,
    } 

    useEffect(() => {
        if (loading) {
            getUsername()
        }
    }, [loading])

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}