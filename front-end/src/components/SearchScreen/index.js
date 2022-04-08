import NavigationSidebar from "../NavigationSidebar";
import React, {useEffect, useRef, useState} from "react";
import {findArtistsQuery} from "../Services/spotify-api-services";

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    const search = async () => {
        const searchKey = searchRef.current.value;
        const response = await findArtistsQuery(searchKey);
        setResults(response);
    };

    return(
        <>
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
        <ul className="list-group">
            {
                results.map(artist => <li>
                    {artist.name}
                </li>)
            }

        </ul>

        </>
    );
};
export default SearchScreen;