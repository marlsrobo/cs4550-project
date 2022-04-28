import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {fetchAlbumByIdFromSpotify} from "../Services/spotify-api-services";
import NavigationSidebar from "../NavigationSidebar";
import {
    addAlbumToUserDislikes,
    addAlbumToUserLikes,
    dislikeAlbum,
    findAlbumById, findDislikedAlbumsByUserId, findLikedAlbumsByUserId,
    likeAlbum,
    postAlbumReview, undislikeAlbum, unlikeAlbum
} from "../Services/albums-service";
import axios from "axios";
import AlbumReviewList from "./AlbumReviewList";
import {findReviewsByAlbumId, postReview} from "../Actions/album-reviews-actions";
import {useDispatch, useSelector} from "react-redux";

const api = axios.create({
    withCredentials: true
});

const AlbumDetailsScreen = () => {
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    const reviewRef = useRef();
    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const [databaseAlbumDetails, setDatabaseAlbumDetails] = useState({});
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

    const handleLikes = async () => {
        if (JSON.stringify(currentUser) !== "{}") {
            const userDislikedAlbums = await findDislikedAlbumsByUserId(currentUser._id);
            let albumInResults = await isAlbumInResults(userDislikedAlbums);
            // user has already disliked album, so remove from dislikes and add to likes
            if (albumInResults) {
                const album = {
                    name: albumDetails.name,
                    albumCover: albumDetails.images[0].url,
                    albumId: albumId
                }
                const response = await likeAlbum(album);
                const undislike = await undislikeAlbum(currentUser._id, albumId);
                setDatabaseAlbumDetails(undislike);

                await addAlbumToUserLikes(albumId, currentUser._id);
            }
            else {
                const userLikedAlbums = await findLikedAlbumsByUserId(currentUser._id);
                let albumInResults = await isAlbumInResults(userLikedAlbums);
                // user has already liked album, so just remove from likes
                if (albumInResults) {
                    const unlike = await unlikeAlbum(currentUser._id, albumId);
                    setDatabaseAlbumDetails(unlike);
                }
                // user hasn't liked or disliked album, just add to likes
                else {
                    const album = {
                        name: albumDetails.name,
                        albumCover: albumDetails.images[0].url,
                        albumId: albumId
                    }
                    const response = await likeAlbum(album);
                    setDatabaseAlbumDetails(response);
                    await addAlbumToUserLikes(albumId, currentUser._id);
                }
            }
        } else {
            alert("You must be logged in to like an album");
        }
    }

    const isAlbumInResults = async (results) => {
        let foundAlbum = false;
        results.forEach(result => {
            if (result.albumId === albumId) {
                foundAlbum = true;
            }
        })
        return foundAlbum;
    }

    const handleDislikes = async () => {
        if (JSON.stringify(currentUser) !== "{}") {
            const userLikedAlbums = await findLikedAlbumsByUserId(currentUser._id);
            let albumInResults = await isAlbumInResults(userLikedAlbums);
            // user has already liked album, so remove from likes and add to dislikes
            if (albumInResults) {
                const album = {
                    name: albumDetails.name,
                    albumCover: albumDetails.images[0].url,
                    albumId: albumId
                }
                const response = await dislikeAlbum(album);
                const unlike = await unlikeAlbum(currentUser._id, albumId);
                setDatabaseAlbumDetails(unlike);
                await addAlbumToUserDislikes(albumId, currentUser._id);
            }
            else {
                const userDislikedAlbums = await findDislikedAlbumsByUserId(currentUser._id);
                let albumInResults = await isAlbumInResults(userDislikedAlbums);
                // user has already disliked album, so just remove from dislikes
                if (albumInResults) {
                    const undislike = await undislikeAlbum(currentUser._id, albumId);
                    setDatabaseAlbumDetails(undislike);
                }
                // user hasn't liked or disliked album, just add to dislikes
                else {
                    const album = {
                        name: albumDetails.name,
                        albumCover: albumDetails.images[0].url,
                        albumId: albumId
                    }
                    const response = await dislikeAlbum(album);
                    setDatabaseAlbumDetails(response);
                    await addAlbumToUserDislikes(albumId, currentUser._id);
                }
            }
        } else {
            alert("You must be logged in to like an album");
        }
    }

    const handleReview = async () => {
        const actualReview = postReview(dispatch, {
            review: reviewRef.current.value,
            reviewerEmail: currentUser.email,
            reviewerName: currentUser.firstName + " " + currentUser.lastName,
            reviewerId: currentUser._id,
            datePosted: new Date(),
            albumName: albumDetails.name,
            albumId: albumId,
            albumCover: albumDetails.images[0].url
        })
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
        fetchCurrentUser();
        fetchAlbumDetailsFromAPI().then(album => setAlbumDetails(album));
        fetchAlbumDetailsFromDatabase().then(album => setDatabaseAlbumDetails(album));
        findReviewsByAlbumId(dispatch, albumId);
    }, []);
    return (
        <div className="row">
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
                    {JSON.stringify(currentUser) !== '{}' && currentUser.userType === "critic" &&
                        <div>
                        <textarea ref={reviewRef} className="mt-3 form-control me-2" placeholder="Leave a review"
                                  style={{"width": "400px"}}/>

                        <button className="mt-3 btn btn-secondary" onClick={handleReview}>Submit</button>
                        </div>}
                    <h4 className="mt-4">Reviews</h4>
                    <AlbumReviewList albumId={albumId}/>
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