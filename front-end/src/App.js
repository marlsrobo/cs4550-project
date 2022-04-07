import './App.css';
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import LoginScreen from "./components/LoginScreen";
import SearchScreen from "./components/SearchScreen";

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
            <Routes>
                <Route path="/">
                    <Route index element={<HomeScreen/>}/>
                    <Route path="profile" element={<ProfileScreen/>}/>
                    <Route path="login" element={<LoginScreen/>}/>
                    <Route path="search" element={<SearchScreen/>}/>
                </Route>
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
