import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../../context/AuthContext"
import SearchFilter from "./SearchFilter"
import styles from "../../../static/css/SelectVRoom.module.css"
import { useNavigate } from 'react-router-dom'

const Pagination = ({rooms}) => {
    const navigate = useNavigate()
    const {tokens} = useContext(AuthContext)

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
            <div onClick={() => navigate(`/videoroom/${vroom.uuid}/`)} key={vroom} className={styles.Room}>
                <p>{vroom.title}</p>
                <h5>{`Guest Pause: ${vroom.guest_pause_permission}`}</h5>
                <h5>{`Video Path: ${vroom.videopath}`}</h5>
            </div>
        ))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const number = parseInt(e.target.textContent)
        switch (number) {
            case 1:
                tokenFetch(`${url}?limit=10`)
                break;           
            default:
                tokenFetch(`${url}?limit=10&offset=${number * 10 - 10}`)
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
    const [pages, setPages] = useState(loadPages(rooms))

    return (
        <>  
            <SearchFilter rooms={rooms} setRoomsRoute={setRoomsRoute}
            loadVrooms={loadVrooms} setPages={setPages}
            loadPages={loadPages}/>
            {roomsRoute}
            {pages}
        </>    
    )
}

export default Pagination;