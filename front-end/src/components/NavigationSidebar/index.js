import React from "react";
import "../WhoToFollowList/index.css";

const NavigationSidebar = (
    {
        active = 'explore'
    }
) => {
    return(
        <>
            <div className="list-group">
                <a className="list-group-item" href="/">
                    <i className="fab fa-twitter"></i></a>
                <a href="home.html" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-home"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Home</div>
                    </div>
                </a>
                <a href="explore.html" className={`list-group-item list-group-item-action ${active === 'explore' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-hashtag"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Explore</div>
                    </div>
                </a>
                <a href="notifications.html" className={`list-group-item list-group-item-action ${active === 'notifications' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-bell"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Notifications</div>
                    </div>
                </a>
                <a href="messages.html" className={`list-group-item list-group-item-action ${active === 'messages' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Messages</div>
                    </div>
                </a>
                <a href="bookmarks.html" className={`list-group-item list-group-item-action ${active === 'bookmarks' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-bookmark"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Bookmarks</div>
                    </div>
                </a>
                <a href="lists.html" className={`list-group-item list-group-item-action ${active === 'lists' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-list"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Lists</div>
                    </div>
                </a>
                <a href="profile.html" className={`list-group-item list-group-item-action ${active === 'profile' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Profile</div>
                    </div>
                </a>
                <a href="more.html" className={`list-group-item list-group-item-action ${active === 'more' ? 'active' : ''}`}>
                    <div className="row" style={{"flexWrap": "nowrap", "alignItems": "center"}}>
                        <div className="col-2 fa-stack">
                            <i className="fas fa-circle fa-stack-1x" style={{"fontSize": "1.3em"}}></i>
                            <i className="fas fa-ellipsis-h fa-stack-1x grey-text-color" style={{"fontSize": "0.7em"}}></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">More</div>
                    </div>
                </a>
            </div>
            <div className="d-grid mt-2">
                <a href="tweet.html"
                   className="btn btn-primary btn-block rounded-pill">
                    Tweet</a>
            </div>
        </>
    );
}
export default NavigationSidebar;