import React, {useState, useContext} from 'react';
import AuthContext from "../../context/AuthContext"
import styles from "../../../static/css/SelectVRoom.module.css"
import { useNavigate } from 'react-router-dom'

const Pagination = ({rooms}) => {
    const navigate = useNavigate()
    const {tokens} = useContext(AuthContext)
    
    //pagination logic
    const pageNumbers = [];

    const tokenFetch = async (url) => {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        })
        let data = await response.json()
        return {'status': response.status, 
        'data': data}
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
        const number = parseInt(e.target.textContent)
        let url;
        if (rooms.id === 'Vrooms') {
            url = '/v1/getvrooms/' 
        } else {
            url = '/v1/vroomset/'
        }

        if (number === 1) {
            let response = await tokenFetch(`${url}?limit=10`)
            
            if (response.status === 200) {
                setRoomsRoute(loadVrooms(response.data.results))
            }
        } else {
            let response = await tokenFetch(`${url}?limit=10&offset=${number * 10 - 10}`)

            if (response.status === 200) {
                setRoomsRoute(loadVrooms(response.data.results))
            }
        }
    }

    const loadPages = (arr) => {
        if (arr.count > 10) {
            const pages = Math.ceil(arr.count / 10)
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i)
            }
            
            return pageNumbers.map(number => (
                <li key={number}>
                    <a onClick={handleClick} href="#">
                        {number}
                    </a>
                </li>
            ))
        }       
    }

    const [roomsRoute, setRoomsRoute] = useState(loadVrooms(rooms.results))
    const [pages, setPages] = useState(loadPages(rooms))
    
    return (
        <>  
            {roomsRoute}
            {pages}
        </>    
    )
}

export default Pagination;