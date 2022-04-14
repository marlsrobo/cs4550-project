import {Link} from "react-router-dom";

const ArtistSearchSummary = ({artist}) => {

    const imageStyle = {
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "20px"
    }

    const formatGenres = (genres) => {
        let result = "";
        for (let i = 0; i < genres.length; i++) {
            result += genres[i] + ", "
        }
        if (genres.length !== 0) {
            result = result.slice(0, -2);
        }
        return result;
    }

    const getImage = (artist) => {
        try {
            return <img id="artistImg" src={artist.images[0].url} className="float-start me-3"
                        style={imageStyle}/>
        }
        catch (Exception) {
            return <img id="artistImg" src="images/blankProfile.png" className="float-start me-3"
                        style={imageStyle}/>
        }
    }

    return(
        <li className="list-group-item pt-3 pb-3">
            {getImage(artist)}
            <div className="float-start">
                <h5>{artist.name}</h5>
                Popularity: {artist.popularity}
                <br/>
                Followers: {artist.followers.total.toLocaleString("en-US")}
                <br/>
                Genres: {formatGenres(artist.genres)}
                <br/>
                <a href={artist.external_urls.spotify} target="_blank">Listen on Spotify</a>
            </div>
            <div className="float-end">
                <Link to={`/artist/details/${artist.id}`}>
                    <button className="btn btn-secondary">Click for more details</button>
                </Link>
            </div>

        </li>
    );

};

export default ArtistSearchSummary;