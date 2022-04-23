import NavigationSidebar from "../NavigationSidebar";
import React, {useEffect, useRef, useState} from "react";
import {performSearch} from "../Services/spotify-api-services";
import ArtistSearchSummary from "./ArtistSearchSummary";
import AlbumSearchSummary from "./AlbumSearchSummary";
import {useLocation, useParams, useNavigate} from "react-router-dom";

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();
    const navigate = useNavigate();
    const {searchString} = useParams();
    const location = useLocation();
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
        const searchType = getSelectedSearchBy();
        const response = await performSearch(searchKey, searchType);
        setResults(response);
        navigate(`/search/${searchType}/${searchKey}`);
    };

    const getSelectedSearchBy = () => {
        var selectElement = document.querySelector('#searchByDropdown');
        return selectElement.value;
    }

    useEffect(() => {
        if(searchString) {
            searchRef.current.value = searchString
            search();
        }
        console.log(location.pathname.slice(0, 14));
    }, [])
    return(
        <>
            <div className="row">
                <div className="col-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active="search"/>
                </div>
                <div className="col-10 col-lg-11 col-xl-10 mt-3">
                    <div className="row mt-2">
                        <div className="col-2">
                            <select id="searchByDropdown" className="form-select" style={{"height": "40px"}}>
                                <option value="artist" selected={location.pathname.slice(0, 14) === '/search/artist' || location.pathname === '/search'}>Artist</option>
                                <option value="album" selected={location.pathname.slice(0, 13) === '/search/album'}>Album</option>
                                <option value="user" selected={location.pathname.slice(0, 12) === '/search/user'}>User</option>
                            </select>
                        </div>
                        <div className="col-8">
                            <input className="form-control bg-black border-1"
                                   style={{"color": "gray"}}
                                   placeholder="Search by artist, album, or user"
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