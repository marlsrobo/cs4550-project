import axios from "axios";
import qs from "qs";
global.Buffer = global.Buffer || require('buffer').Buffer;

const client_id = 'bdf7e69e81d74af595db40041ea8f146'; // Your client id
const client_secret = '631a50bd9a064799b670a8fbba47e625'; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try{
        //make post request to SPOTIFY API for access token, sending relavent info
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({'grant_type':'client_credentials'});

        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        //return access token
        return response.data.access_token;
    }catch(error){
        //on fail, log the error in console
        console.log(error);
    }
};

export const performSearch = async (query, qType) => {
    //request token using getAuth() function
    const access_token = await getAuth();

    const api_url = `https://api.spotify.com/v1/search?type=${qType}&q=${query}`;
    console.log(api_url);
    try{
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        switch (qType) {
            case "album":
                console.log(response.data.albums.items);
                return response.data.albums.items;
            case "artist":
                return response.data.artists.items;
            default:
                console.log("not an album or artist");

        }
    }catch(error){
        console.log(error);
    }
};

export const fetchAlbumByIdFromSpotify = async (albumId) => {
    const access_token = await getAuth();

    const api_url = `https://api.spotify.com/v1/albums/${albumId}`;
    console.log(api_url);
    try{
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    }catch(error){
        console.log(error);
    }
};

export const fetchArtistByIdFromSpotify = async (artistId) => {
    const access_token = await getAuth();

    const api_url = `https://api.spotify.com/v1/artists/${artistId}`;
    console.log(api_url);
    try{
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    }catch(error){
        console.log(error);
    }
};

export const fetchAllArtistAlbumsByIdFromSpotify = async (artistId) => {
    const access_token = await getAuth();

    const api_url = `https://api.spotify.com/v1/artists/${artistId}/albums?market=US&limit=50`;
    console.log(api_url);
    try{
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    }catch(error){
        console.log(error);
    }
};