import {Link} from "react-router-dom";
import {useState} from "react";

const ProfileInfo = () => {
    return (
      <h1>Logged in</h1>
    );
}

const LoginComponent = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div>
            {!loggedIn && <Link to='/login' onClick={() => setLoggedIn(true)}>Login</Link>}
            {loggedIn && <ProfileInfo/>}
        </div>
    );
};
export default LoginComponent;