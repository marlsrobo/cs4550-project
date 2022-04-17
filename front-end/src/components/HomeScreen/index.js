import React from "react";
import NavigationSidebar from "../NavigationSidebar";
import {Outlet} from "react-router-dom";

const HomeScreen = () => {
    return(
        <div className="row mt-2">
            <h1>Home Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            {/*<div className="col-10 col-lg-7 col-xl-6">*/}
            {/*    <Outlet/>*/}
            {/*</div>*/}
            {/*<div className="d-none d-lg-block col-lg-4 col-xl-4">*/}
            {/*    <WhoToFollowList/>*/}
            {/*</div>*/}
        </div>
    );
};
export default HomeScreen;