import React from "react";
import {Link} from "react-router-dom";
import LoginComponent from "../LoginComponent";

const NavigationSidebar = (
    {
        active = 'explore'
    }
) => {
    return(
        <>
            <div className="list-group">
                <LoginComponent/>
                <Link to="/" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-home"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Home</div>
                    </div>
                </Link>
                <Link to="/search" className={`list-group-item list-group-item-action ${active === 'search' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Search</div>
                    </div>
                </Link>
            </div>
        </>
    );
}
export default NavigationSidebar;