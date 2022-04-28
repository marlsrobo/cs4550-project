import {Link} from "react-router-dom";

const HomeScreenFollowUserItem = ({user}) => {
    const profilePicStyle = {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "50%",
        margin: "5px"
    }
    return(
      <li className="list-group-item">
          <div className="row">
              <div className="col-4">
                  <Link to={`/profile/${user._id}`}>
                <img src={user.profilePic} style={profilePicStyle}/>
                  </Link>
              </div>
              <div className="col-8">
                  <Link to={`/profile/${user._id}`} style={{textDecoration: 'none',
                  position: "absolute", top: "35%", left: "35%"}}>
                <h6 style={{fontSize: "18px"}}> {user.firstName} {user.lastName}</h6>
                  </Link>
              </div>
          </div>

      </li>
    );
}

export default HomeScreenFollowUserItem;