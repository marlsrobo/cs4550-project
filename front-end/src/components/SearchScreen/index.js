import NavigationSidebar from "../NavigationSidebar";
import React, {useEffect, useRef, useState} from "react";
import {findArtistsQuery} from "../Services/spotify-api-services";
import ArtistSearchSummary from "./ArtistSearchSummary";

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    let searchBy = "artist";

    // let searchBy = document.getElementById("searchByDropdown");

    const search = async () => {
        const searchKey = searchRef.current.value;
        const response = await findArtistsQuery(searchKey);
        setResults(response);
    };

    const getSelectedSearchBy = () => {
        var selectElement = document.querySelector('#searchByDropdown');
        var output = selectElement.value;
        searchBy = output;
    }

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
                        <select id="searchByDropdown" defaultValue="artist" className="form-select" style={{"height": "40px"}}
                        onChange={getSelectedSearchBy}>
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
                <ul className="list-group mt-3">
                    {
                        results.map(artist => <ArtistSearchSummary artist={artist}/>)
                    }

                </ul>
            </div>
        </div>


        </>
    );
};
export default SearchScreen;