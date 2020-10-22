import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { BookContainer } from "./BookContainer";
import "../styles/Profile.css";
import { useSelector } from "react-redux";

/**
 * Profile is a component for the apps profile-page. It shows the users username,
 * and the users favorite books, books he/she wants to read, and books she/he has read.
 * @var showing is a state that is used to decide which books are shown of the three categories
 * mentioned above.
 * @var phonePage is a constant that says what page you are on when you are on a phone.
 * @var username is the users username which will be shown.
 */

const Profile = () => {
  const [showing, changeView] = useState("favorites");

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  let username: string = "winter**"; // Skal være redux sikkert, eller noe annet, ikke en var

  return (
    <div id="profile-page" className={phonePage}>
      <MdAccountCircle size="70px" />
      <h4>Username: {username}</h4>
      <button
        id="favorites"
        className={showing + " red-button"}
        onClick={() => changeView("favorites")}
      >
        Favorites
      </button>
      <button
        id="wish-to-read"
        className={showing + " red-button"}
        onClick={() => changeView("wish-to-read")}
      >
        Wish to read
      </button>
      <button
        id="have-read"
        className={showing + " red-button"}
        onClick={() => changeView("have-read")}
      >
        Have read
      </button>
      <BookContainer />
    </div>
  );
};

export default Profile;
