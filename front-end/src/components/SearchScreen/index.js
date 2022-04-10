import NavigationSidebar from "../NavigationSidebar";
import React, {useRef, useState} from "react";
import {performSearch} from "../Services/spotify-api-services";
import ArtistSearchSummary from "./ArtistSearchSummary";
import AlbumSearchSummary from "./AlbumSearchSummary";

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    const formatSearch = (resultObject) => {
        if (getSelectedSearchBy() === "artist") {
            return <ArtistSearchSummary artist={resultObject}/>
        }
        else if (getSelectedSearchBy() === "album") {
            return <AlbumSearchSummary album={resultObject}/>
        }
    }

    const search = async () => {
        const searchKey = searchRef.current.value;
        const response = await performSearch(searchKey, getSelectedSearchBy());
        setResults(response);
    };

    const getSelectedSearchBy = () => {
        var selectElement = document.querySelector('#searchByDropdown');
        return selectElement.value;
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
                        <select id="searchByDropdown" className="form-select" style={{"height": "40px"}}
                        >
                            <option value="artist">Artist</option>
                            <option value="album">Album</option>
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
                        results.map(result => formatSearch(result))
                    }

                </ul>
            </div>
        </div>


        </>
    );
};
export default SearchScreen;