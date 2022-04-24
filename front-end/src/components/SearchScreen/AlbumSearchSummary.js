import {Link} from "react-router-dom";

const AlbumSearchSummary = (album) => {

    const formatArtists = (artists) => {
        let result = "";

        for (let i = 0; i < artists.length; i++) {
            result += artists[i].name + ", "
        }
        if (artists.length !== 0) {
            result = result.slice(0, -2);
        }
        return result;
    }

    const imageStyle = {
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "20px"
    }

    const getImage = (album) => {
        try {
            return <img id="albumImg" src={album.images[0].url} className="float-start me-3"
                        style={imageStyle}/>
        }
        catch (Exception) {
            return <img id="albumImg" src="images/blankProfile.png" className="float-start me-3"
                        style={imageStyle}/>
        }
    }

    return(
        <li className="list-group-item pt-3 pb-3">
            {getImage(album.album)}
            <div className="float-start" >
                <h5>{album.album.name}</h5>
                Artists: {formatArtists(album.album.artists)}
                <br/>
                Released: {album.album.release_date}
                <br/>
                <br/>
                <a href={album.album.external_urls.spotify} target="_blank">Listen on Spotify</a>
            </div>
            <div className="float-end">
                <Link to={`/album/details/${album.album.id}`}>
                    <button className="btn btn-secondary">Click for more details</button>
                </Link>
            </div>

        </li>
    );
}
export default AlbumSearchSummary;