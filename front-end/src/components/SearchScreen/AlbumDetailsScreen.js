import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchAlbumByIdFromSpotify} from "../Services/spotify-api-services";
import NavigationSidebar from "../NavigationSidebar";

const AlbumDetailsScreen = () => {

    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const getAlbumDetails = async () => {
        let details = await fetchAlbumByIdFromSpotify(albumId);

        console.log(details);
        return details.data;
        // setAlbumDetails(details.data);
        // console.log(details.data);
      // console.log(albumDetails);
    };

    const formatArtists = (artists) => {
        let result = "";
        console.log(artists);
        for (let i = 0; i < artists.length; i++) {
            result += artists[i].name + ", "
        }
        if (artists.length !== 0) {
            result = result.slice(0, -2);
        }
        return result;
    }

    const getImage = (album) => {
        try {
            return <img id="albumImg" src={album.images[0].url} className=" me-3" height="400px"/>
        }
        catch (Exception) {
            return <img id="albumImg" src="images/blankProfile.png" className=" me-3"/>
        }
    }

    const getArtists = (album) => {
        try {
            return <h2>{album.artists[0].name}</h2>
        }
        catch (Exception) {
            return <h2>hi</h2>
        }
    }

    useEffect(() => {
        getAlbumDetails().then(album => setAlbumDetails(album));
        // setAlbumDetails(getAlbumDetails());
        console.log(albumDetails);
    }, []);
    return(
        <div className="row mt-2">
            <h1>Album Details Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <h1>{albumDetails.name}</h1>
                {getArtists(albumDetails)}
                {/*<h2>{albumDetails.images[0].url}</h2>*/}
                {/*<h2>{formatArtists(albumDetails.artists)}</h2>*/}
                {/*<h2>{albumDetails.artists[0].name}</h2>*/}
                <h2>{JSON.stringify(albumDetails.artists)}</h2>
                {getImage(albumDetails)}


            </div>
        </div>

    );
};
export default AlbumDetailsScreen;