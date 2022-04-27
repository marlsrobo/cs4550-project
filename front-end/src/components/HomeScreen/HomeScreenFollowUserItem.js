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
              <div  className="col-4">
                <img src={user.profilePic} style={profilePicStyle}/>
              </div>
              <div className="col-8">
                <h6>{user.firstName} {user.lastName}</h6>
              </div>
          </div>

      </li>
    );
}

export default HomeScreenFollowUserItem;