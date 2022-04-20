import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NavigationSidebar from "../NavigationSidebar";

const api = axios.create({
    withCredentials: true
});

const PrivacyScreen = () => {
    return (
        <div className="row mt-2">
            <h1>Privacy Policy</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <p>
                    This privacy policy ("policy") will help you understand how we use and
                    protect the data you provide to us when you visit and use our service.
                    We reserve the right to change this policy at any given time, of which you will be promptly
                    updated. If you want to make sure that you are up to date with the latest changes, we advise
                    you to frequently visit this page.
                </p>

                <h4>What User Data We Collect</h4>
                <p>
                    When you visit the website, we may collect the following data:
                    <li> Your IP address.</li>
                    <li> Your contact information and email address.</li>
                    <li> Other information such as interests and preferences.</li>
                    <li> Data profile regarding your online behavior on our website.</li>
                </p>

                <h4>Why We Collect Your Data </h4>
                <p>
                    We are collecting your data for several reasons:
                    <li> To better understand your needs.</li>
                    <li> To improve our services and products.</li>
                    <li> To send you promotional emails containing the information we think you will find
                        interesting.
                    </li>
                    <li> To contact you to fill out surveys and participate in other types of market research.</li>
                    <li> To customize our website according to your online behavior and personal preferences.</li>
                </p>

                <h4>Safeguarding and Securing the Data</h4>
                <p>
                    We are committed to securing your data and keeping it confidential and preventing data theft,
                    unauthorized access, and disclosure by implementing the latest technologies and software.
                    This helps us safeguard all the information we collect online.
                </p>
            </div>
        </div>
    );
}
export default PrivacyScreen;
            