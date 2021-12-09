import React from "react";
import {Link} from "react-router-dom";
import './LandingPage.css';

export default function LandingPage(){
    return(
        <div className='landing'>
            <h1 className='title'>Welcome To Food Recipes</h1>
            <Link to = '/home'>
                <button class="button"><span>Home</span></button>
            </Link>
        </div>
    )
}