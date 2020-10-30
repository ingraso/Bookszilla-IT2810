import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { BookContainer } from "./BookContainer";
import "../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { BsBoxArrowRight } from "react-icons/bs";
import { changeLoginStatus } from "../redux/actions";
import UserHandling from "./UserHandling";

/**
 * Profile is a component for the applications profile-page. It shows the users username,
 * and the users favorite books, books he/she wants to read, and books she/he has read.
 * @var showing is a state that is used to decide which books are shown of the three categories
 * mentioned above.
 * @var phonePage is a constant that says what page you are on when you are on a phone.
 * @var isLoggedIn is a boolean showing if a user is logged in or not.
 */

const Profile = () => {
  const [showing, changeView] = useState("favorites");
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  const dispatch = useDispatch();

  return (
    <>
      {isLoggedIn ? (
        <div id="profile-page" className={phonePage}>
          <button
            id="profile-sign-out"
            className={phonePage.phonePage}
            onClick={() => dispatch(changeLoginStatus(false))}
          >
            <BsBoxArrowRight size="30px" />
          </button>
          <div id="info-on-top-container">
            <MdAccountCircle size="70px" />
            <h4>Username:</h4>
            <button
              id="favorites"
              className={showing + " red-button profile-view-button"}
              onClick={() => changeView("favorites")}
            >
              Favorites
            </button>
            <button
              id="wish-to-read"
              className={showing + " red-button profile-view-button"}
              onClick={() => changeView("wish-to-read")}
            >
              Wish to read
            </button>
            <button
              id="have-read"
              className={showing + " red-button profile-view-button"}
              onClick={() => changeView("have-read")}
            >
              Have read
            </button>
          </div>
          <BookContainer />
        </div>
      ) : (
        <div id="login-page" className={phonePage}>
          <UserHandling />
        </div>
      )}
    </>
  );
};

export default Profile;
