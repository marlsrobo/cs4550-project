import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchAlbumByIdFromSpotify} from "../Services/spotify-api-services";
import NavigationSidebar from "../NavigationSidebar";

const AlbumDetailsScreen = () => {

    const {albumId} = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const getAlbumDetails = async () => {
        let details = await fetchAlbumByIdFromSpotify(albumId);
        // console.log(details);
        return details.data;
        // setAlbumDetails(details.data);
        // console.log(details.data);
      // console.log(albumDetails);
    };

    const getImage = (album) => {
        try {
            return <img id="albumImg" src={album.images[0].url} className="me-3" height="400px"/>
        }
        catch (Exception) {
            return <img id="albumImg" src="/images/blankProfile.png" className=" me-3"/>
        }
    };

    const getArtists = (album) => {
        try {
            return <h3><Link to={`/artist/details/${album.artists[0].id}`}>{album.artists[0].name}</Link></h3>
        }
        catch (Exception) {
        }
    };

    const millisToMinutesAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const formatTrack = (track) => {
        return(
          <li className="list-group-item">
              <span className="float-start">
                  {track.track_number}. {track.name} <span style={{"color": "red"}}>{track.explicit && "EXPLICIT"}</span>
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
            return(
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
                <a href={album.external_urls.spotify} target="_blank"><img src="/images/Spotify_icon.png" className="float-end ps-5" height="100px"/></a>
            );

        } catch (Exception) { }
    };

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
                <div className="float-start">
                    {getImage(albumDetails)}
                    <br/>
                    <button className="mt-3 me-3 btn btn-success"><i className="far fa-thumbs-up me-1 wd-14px-font wd-gray-color"></i></button>
                    <button className="mt-3 btn btn-danger"><i className="far fa-thumbs-down me-1 wd-14px-font wd-gray-color"></i></button>
                    <br/>
                    <textarea className="mt-3 form-control me-2" placeholder="Leave a review" style={{"width": "400px"}}></textarea>
                    <button className="mt-3 btn btn-secondary">Submit</button>

                </div>
                <div>
                    {formatAlbumLinkToSpotify(albumDetails)}
                    <h1>{albumDetails.name}</h1>
                </div>
                {getArtists(albumDetails)}
                <br/>
                {formatTracks(albumDetails)}
            </div>
        </div>
    );
};
export default AlbumDetailsScreen;