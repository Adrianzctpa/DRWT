import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import GeneralContext from "../../context/GeneralContext"
import SearchFilter from "./SearchFilter"
import styles from "../../../static/css/SelectVRoom.module.css"

const Pagination = ({rooms}) => {
    const {tokens} = useContext(GeneralContext)
    const ROOMS_PER_PAGE = 10

    let url;
    if (rooms.id === 'Vrooms') {
        url = '/v1/getvrooms/' 
    } else {
        url = '/v1/vroomset/'
    }

    const tokenFetch = async (url) => {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        })
        let data = await response.json()
        
        if (response.status === 200) {
            setRoomsRoute(loadVrooms(data.results))
        }
    }

    const loadVrooms = (arr) => {
        return arr.map(vroom => (
            <div key={vroom} className={`card ${styles.spacing}`}>
                <div class="card-header">
                    {vroom.title}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{`Owner: ${vroom.owner}`}</h5>
                    <p class="card-text">{`Guest can pause: ${vroom.guest_pause_permission}`}</p>
                    <Link to={`/videoroom/${vroom.uuid}`}><a class="btn btn-primary">Watch together</a></Link>
                </div>
            </div>
        ))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const number = parseInt(e.target.textContent)
        const inputQuery = document.getElementById('inputquery').value
        
        if (inputQuery !== '') {
            switch(number) {
                case 1: 
                    tokenFetch(`${url}?limit=10&title=${inputQuery}`)
                    break;
                default: 
                    tokenFetch(`${url}?limit=10&offset=${number * ROOMS_PER_PAGE - ROOMS_PER_PAGE}&title=${inputQuery}`)    
            }
        } else {
            switch (number) {
                case 1:
                    tokenFetch(`${url}?limit=10`)
                    break;           
                default:
                    tokenFetch(`${url}?limit=10&offset=${number * ROOMS_PER_PAGE - ROOMS_PER_PAGE}`)
            }
        }
    }

    const pageNumbers = [];
    const loadPages = (arr) => {

        if (arr.count > 10) {
            const pages = Math.ceil(arr.count / 10)
            for (let i = 1; i <= pages; i++) {
                if (!pageNumbers.includes(i)) {    
                    pageNumbers.push(i)
                }    
            }
            
            return pageNumbers.map(number => (
                <li key={number}>
                    <button onClick={handleClick}>
                        {number}
                    </button>
                </li>
            ))
        }
    }

    const [roomsRoute, setRoomsRoute] = useState(loadVrooms(rooms.results))
    const [pages, setPages] = useState('')

    useEffect(() => {
        setPages(loadPages(rooms))
    }, [])

    return (
        <>  
            <SearchFilter rooms={rooms} setRoomsRoute={setRoomsRoute}
            loadVrooms={loadVrooms} setPages={setPages}
            loadPages={loadPages} />
            { roomsRoute.length > 0 ?
                <>
                    {roomsRoute}
                    <div className={styles.pageDiv}>
                        {pages}
                    </div>
                </> : (
                    <h1 className={styles.spacing}> No rooms! </h1>
                )
            }
        </>    
    )
}

export default Pagination;