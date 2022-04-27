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
import PrivacyScreen from "./components/PrivacyScreen";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import SignupScreen from "./components/SignupScreen";
import SigninScreen from "./components/SigninScreen";
import PrivacyPolicyComponent from "./components/PrivacyPolicyComponent";

import UsersReducer from "./components/Reducers/users-reducer";

const store = createStore(UsersReducer);


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container m-4" style={{"paddingBottom": "80px"}}>
                    <Routes>
                        <Route path="/">
                            <Route path="signup" element={<SignupScreen/>}/>
                            <Route path="signin" element={<SigninScreen/>}/>
                            <Route index element={<HomeScreen/>}/>
                            <Route path="profile/:profileUserId" element={<ProfileScreen/>}/>
                            <Route path="login" element={<LoginScreen/>}/>
                            <Route path="search" element={<SearchScreen/>}/>
                            <Route path="search/artist/:searchString" element={<SearchScreen/>}/>
                            <Route path="search/album/:searchString" element={<SearchScreen/>}/>
                            <Route path="album/details/:albumId" element={<AlbumDetailsScreen/>}/>
                            <Route path="artist/details/:artistId" element={<ArtistDetailsScreen/>}/>
                            <Route path="privacy-policy" element={<PrivacyScreen/>}/>
                        </Route>
                    </Routes>
                    <PrivacyPolicyComponent/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
