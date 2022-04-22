import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {fetchAlbumByIdFromSpotify} from "../Services/spotify-api-services";
import NavigationSidebar from "../NavigationSidebar";
import {
    addAlbumToUserDislikes,
    addAlbumToUserLikes,
    dislikeAlbum,
    findAlbumById,
    findAlbumReviewsByAlbumId,
    likeAlbum,
    postAlbumReview
} from "../Services/albums-service";
import axios from "axios";
import AlbumReviewList from "./AlbumReviewList";

const api = axios.create({
    withCredentials: true
});

const AlbumDetailsScreen = () => {
    const reviewRef = useRef();
    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const [databaseAlbumDetails, setDatabaseAlbumDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
        }
    }

    const fetchAlbumDetailsFromAPI = async () => {
        let details = await fetchAlbumByIdFromSpotify(albumId);
        return details.data;
    };
    const fetchAlbumDetailsFromDatabase = async () => {
        let details = await findAlbumById(albumId);
        if (details) {
            return details;
        }
    }
    const findReviewsForAlbum = async () => {
        let reviews = await findAlbumReviewsByAlbumId(albumId);
        return reviews;
    }

    const handleLikes = async () => {
        if (JSON.stringify(currentUser) !== "{}") {
            const album = {
                name: albumDetails.name,
                albumId: albumId
            }
            const response = await likeAlbum(album);
            console.log(response);
            setDatabaseAlbumDetails(response);
            await addAlbumToUserLikes(albumId, currentUser._id);
        } else {
            alert("You must be logged in to like an album");
        }
    }

    const handleDislikes = async () => {
        if (JSON.stringify(currentUser) !== "{}") {
            const album = {
                name: albumDetails.name,
                albumId: albumId
            }
            const response = await dislikeAlbum(album);
            setDatabaseAlbumDetails(response);
            await addAlbumToUserDislikes(albumId, currentUser._id);
        } else {
            alert("You must be logged in to dislike an album");
        }
    }

    const handleReview = async () => {
        const actualReview = await postAlbumReview(currentUser._id, albumId, {
            review: reviewRef.current.value,
            reviewerEmail: currentUser.email,
            datePosted: new Date(),
            albumId: albumId
        })
        console.log("reviews before adding")
        console.log(actualReview);
        console.log(reviews);
        setReviews(reviews => ([actualReview, ...reviews]));
        console.log("reviews after adding")
        console.log(reviews)
    }

    const getImage = (album) => {
        try {
            return <img id="albumImg" src={album.images[0].url} className="me-3" height="400px"/>
        } catch (Exception) {
            return <img id="albumImg" src="/images/blankProfile.png" className=" me-3"/>
        }
    };

    const getArtists = (album) => {
        try {
            return <h3><Link to={`/artist/details/${album.artists[0].id}`}>{album.artists[0].name}</Link></h3>
        } catch (Exception) {
        }
    };

    const millisToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const formatTrack = (track) => {
        return (
            <li className="list-group-item">
              <span className="float-start">
                  {track.track_number}. {track.name} <span
                  style={{"color": "red"}}>{track.explicit && "EXPLICIT"}</span>
              </span>
                <span className="float-end">
                  {millisToMinutesAndSeconds(track.duration_ms)}
              </span>
            </li>
        );
    };

    const formatTracks = (album) => {
        try {
            console.log(album.tracks.items);
            return (
                <ul className="list-group">

                    {
                        album.tracks.items.map(track => formatTrack(track))
                    }
                </ul>
            );
        } catch (Exception) {

        }
    };

    const formatAlbumLinkToSpotify = (album) => {
        try {
            return (
                <a href={album.external_urls.spotify} target="_blank"><img src="/images/Spotify_icon.png"
                                                                           className="float-end ps-5"
                                                                           height="100px"/></a>
            );

        } catch (Exception) {
        }
    };

    useEffect(() => {
        console.log(reviewRef);
        fetchCurrentUser();
        fetchAlbumDetailsFromAPI().then(album => setAlbumDetails(album));
        fetchAlbumDetailsFromDatabase().then(album => setDatabaseAlbumDetails(album));
        findReviewsForAlbum().then(reviews => setReviews(reviews));
        console.log(albumDetails);
    }, []);
    return (
        <div className="row mt-2 mb-4">
            <h1>Album Details Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3 row">
                <div className="col-12 col-lg-6 col-xxl-5">
                    {getImage(albumDetails)}
                    <br/>

                    <button onClick={handleLikes} className="mt-3 me-3 btn btn-success">
                        <i className="far fa-thumbs-up me-1 wd-14px-font wd-gray-color"/>
                        {databaseAlbumDetails ? databaseAlbumDetails.likes : 0}
                    </button>
                    <button onClick={handleDislikes} className="mt-3 btn btn-danger">
                        <i className="far fa-thumbs-down me-1 wd-14px-font wd-gray-color"/>
                        {databaseAlbumDetails ? databaseAlbumDetails.dislikes : 0}
                    </button>
                    <br/>
                    {JSON.stringify(currentUser) !== '{}' &&
                        <textarea ref={reviewRef} className="mt-3 form-control me-2" placeholder="Leave a review"
                                  style={{"width": "400px"}}/>}
                    {JSON.stringify(currentUser) !== '{}' &&
                        <button className="mt-3 btn btn-secondary" onClick={handleReview}>Submit</button>}
                    <h4 className="mt-4">Reviews</h4>
                    <AlbumReviewList reviews={reviews}/>
                    {/*{JSON.stringify(reviews)}*/}
                </div>
                <div className="col-12 col-lg-6 col-xxl-7">
                    <div>
                        {formatAlbumLinkToSpotify(albumDetails)}
                        <h1>{albumDetails.name}</h1>
                    </div>
                    {getArtists(albumDetails)}
                    <br/>
                    {formatTracks(albumDetails)}
                </div>
            </div>
        </div>
    );
};
export default AlbumDetailsScreen;