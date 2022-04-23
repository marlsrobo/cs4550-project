import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "./index.css";

const api = axios.create({
    withCredentials: true
});

const PrivacyPolicyComponent = () => {
    return (
        <div className="top-layer">
            <div className="top-layer pos-fixed dimension-landscape bg-color-dark-gray pt-3 ps-5">
                <span className="float-start">
                <b>Notice.</b> By using our website, you agree to our <Link to="/privacy-policy">Privacy Policy.</Link>
                    </span>
                <Link to="/privacy-policy" className="col">
                    <button className='btn btn-primary mb-3 me-3 float-end'>Read Privacy Policy</button>
                </Link>
            </div>
        </div>
    );
}

export default PrivacyPolicyComponent;