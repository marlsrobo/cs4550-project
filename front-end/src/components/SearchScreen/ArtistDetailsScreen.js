import {fetchArtistByIdFromSpotify, fetchAllArtistAlbumsByIdFromSpotify} from "../Services/spotify-api-services";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const ArtistDetailsScreen = () => {

    const {artistId} = useParams();
    const [artistDetails, setArtistDetails] = useState({});
    const [artistAlbums, setArtistAlbums] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
        }
    }

    const getArtistDetails = async () => {
        let details = await fetchArtistByIdFromSpotify(artistId);
        console.log(details.data);
        return details.data;
    };

    const getArtistAlbums = async () => {
        let albums = await fetchAllArtistAlbumsByIdFromSpotify(artistId);
        console.log(albums.data);
        return albums.data;
    }

    const getImage = (artist, height) => {
        try {
            return <img id="artistImg" src={artist.images[0].url} className="me-3" height={height} width={height}
                        style={{"objectFit": "cover"}}/>
        } catch (Exception) {
            return <img id="artistImg" src="/images/blankProfile.png" className=" me-3"/>
        }
    };


    const formatAlbumLinkToSpotify = (artist) => {
        try {
            return (
                <a href={artist.external_urls.spotify} target="_blank">
                    <img src="/images/Spotify_icon.png" className="float-end ps-5" height="100px"/></a>
            );
        } catch (Exception) {
        }
    };

    const getFollowers = (artist) => {
        try {
            return <h5>{artist.followers.total.toLocaleString("en-US")} listeners</h5>;
        } catch (Exception) {
        }
    };

    const formatAlbum = (album) => {
        return (
            <div className="col pb-4">
                <h5>{album.name}</h5>
                <h6>{album.release_date.slice(0, 4)} ∙ {album.album_type} ∙ {album.total_tracks} songs</h6>
                <Link to={`/album/details/${album.id}`}>{getImage(album, "200px")}</Link>

            </div>
        );
    };

    const formatAlbums = (albums) => {
        try {
            return (
                <div className="row">
                    {
                        albums.items.map(album => formatAlbum(album))
                    }
                </div>
            );
        } catch (Exception) {

        }
    };

    const followArtist = () => {
        console.log("following")
    }

    const unfollowArtist = () => {
        console.log("unfollowing")
    }

    const currentUserFollowingArtist = () => {

    }

    const handleFollowUnfollow = () => {
        const currentEditButton = document.getElementById("follow-btn");
        if (currentEditButton.textContent === "Follow") {
            currentEditButton.textContent = "Unfollow"
             // todo actually follow
            followArtist();
        }
        else {
            currentEditButton.textContent = "Follow";
             // todo actually unfollow
            unfollowArtist();
        }
    }


    useEffect(() => {
        fetchCurrentUser();
        getArtistDetails().then(artist => setArtistDetails(artist));
        getArtistAlbums().then(albums => setArtistAlbums(albums));
    }, []);

    return (
        <div className="row">
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3 row">
                <div className="col-12 col-lg-6 col-xxl-5">
                    {getImage(artistDetails, "400px")}
                    <br/>
                    {JSON.stringify(currentUser) !== '{}' &&
                    <button onClick={handleFollowUnfollow} id="follow-btn"
                        className="btn btn-secondary mt-4">Follow</button> }
                </div>
                <div className="col-12 col-lg-6 col-xxl-7">
                    <div >
                        {formatAlbumLinkToSpotify(artistDetails)}
                        <h1>{artistDetails.name}</h1>
                        {getFollowers(artistDetails)}
                    </div>

                    <div className="mt-5">
                        <h3 className="mt-5 mb-3">Discography</h3>
                        {formatAlbums(artistAlbums)}
                    </div>
                </div>
            </div>

        </div>
    );
};
export default ArtistDetailsScreen;