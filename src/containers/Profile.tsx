import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import  { BookContainer } from "./BookContainer";
import "../styles/Profile.css";

const Profile = () => {

    const [showing, changeView] = useState("favorites")

    let username: string = "winter**";  // Skal være redux sikkert, eller noe annet, ikke en var

    return(
        <div id="profile-page">
            <MdAccountCircle size="70px" />
            <h4>Username: {username}</h4>
            <button id="favorites" className={showing + " red-button"} onClick={() => changeView("favorites")}>Favorites</button>
            <button id="wish-to-read" className={showing + " red-button"} onClick={() => changeView("wish-to-read")}>Wish to read</button>
            <button id="have-read" className={showing + " red-button"} onClick={() => changeView("have-read")}>Have read</button>
            <BookContainer />
        </div>
    )
}

export default Profile;