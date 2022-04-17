import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';

import './App.css';
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import LoginScreen from "./components/LoginScreen";
import SearchScreen from "./components/SearchScreen";
import AlbumDetailsScreen from "./components/SearchScreen/AlbumDetailsScreen";
import ArtistDetailsScreen from "./components/SearchScreen/ArtistDetailsScreen";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignupScreen from "./components/SignupScreen";
import SigninScreen from "./components/SigninScreen";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
            <Routes>
                <Route path="/">
                    <Route path="signup" element={<SignupScreen/>}/>
                    <Route path="signin" element={<SigninScreen/>}/>
                    <Route index element={<HomeScreen/>}/>
                    <Route path="profile" element={<ProfileScreen/>}/>
                    <Route path="login" element={<LoginScreen/>}/>
                    <Route path="search" element={<SearchScreen/>}/>
                    <Route path="search/:searchString" element={<SearchScreen/>}/>
                    <Route path="album/details/:albumId" element={<AlbumDetailsScreen/>}/>
                    <Route path="artist/details/:artistId" element={<ArtistDetailsScreen/>}/>
                </Route>
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
