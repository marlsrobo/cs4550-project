import React, {useRef, useState} from "react";
import axios from "axios";

const SearchBar = () => {
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    const searchArtists = async () => {
        const searchKey = searchRef.current.value;
        const response = await axios.get();
        setResults(response.data);
    };

    return(
        <>
            <div className="dropdown float-start">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Search for
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Artist</a>
                    <a className="dropdown-item" href="#">Song</a>
                    <a className="dropdown-item" href="#">User</a>
                </div>

            </div>
            <input className="form-control bg-black border-1"
                      style={{"color": "gray"}}
                      placeholder="Search by artist or song"
                      ref={searchRef}>
            </input>
            <div className="float-end">
                <button className="btn btn-primary float-right"
                        onClick={search}>
                    Search
                </button>
            </div>
        </>
    );
};

export default SearchBar;