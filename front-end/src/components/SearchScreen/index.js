import NavigationSidebar from "../NavigationSidebar";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    const clientID = "bdf7e69e81d74af595db40041ea8f146";
    const clientSecret = "631a50bd9a064799b670a8fbba47e625";
    const baseURL = "https://api.spotify.com/v1";
    const authURL = "https://accounts.spotify.com/api/token";

    const getAPIToken = async () => {
        const response = await axios.post(authURL, {
            'grant_type': 'client_credentials',
            'client_id': clientID,
            'client_secret': clientSecret
        })
        console.log(response.data);
    }



    const search = async (api_url) => {
        const searchKey = searchRef.current.value;
        // fix exact thing
        const response = await axios.get(api_url + searchKey);
        setResults(response.data);
    };

    return(
        <div className="row mt-2">
            <h1>Search Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>

            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <div className="row mt-2">
                    <div className="col-2">
                        <select defaultValue="artist" className="form-select" style={{"height": "40px"}}>
                            <option value="artist">Artist</option>
                            <option value="track">Song</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="col-8">
                        <input className="form-control bg-black border-1"
                               style={{"color": "gray"}}
                               placeholder="Search by artist, song, or user"
                               ref={searchRef}>
                        </input>
                    </div>
                    <div className="float-end col-2">
                        <button className="btn btn-primary float-right"
                                onClick={search}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchScreen;