import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext"

const SearchFilter = ({rooms, setRoomsRoute, 
                    loadVrooms, setPages, loadPages}) => {
    
    const {tokens} = useContext(AuthContext)

    let url;
    if (rooms.id === 'Vrooms') {
        url = '/v1/getvrooms/' 
    } else {
        url = '/v1/vroomset/'
    }

    const handleChange = async (e) => {
        const searchParam = e.target.value

        let response = await fetch(`${url}?title=${searchParam}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            if (data.results.length > 0) {
                setRoomsRoute(loadVrooms(data.results))
                setPages(loadPages(data))
            }
        }
    }
    
    return (
        <>
            <input onChange={handleChange} type="text" id="inputquery" placeholder="Search..."/>
            <button>Search</button>
        </>
    )
}

export default SearchFilter;