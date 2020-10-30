import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { BookContainer } from "./BookContainer";
import "../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { BsBoxArrowRight } from "react-icons/bs";
import { changeLoginStatus } from "../redux/actions";
import UserHandling from "./UserHandling";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_USER_INFO} from "../assets/queries";

/**
 * Profile is a component for the applications profile-page. It shows the users username,
 * and the users favorite books, books he/she wants to read, and books she/he has read.
 * @var showing is a state that is used to decide which books are shown of the three categories
 * mentioned above.
 * @var phonePage is a constant that says what page you are on when you are on a phone.
 * @var username is the user's username.
 */

const Profile = () => {
  const [showing, changeView] = useState("favorites");
  //Get token from redux
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpbGRlLXRlc3QiLCJpZCI6IjVmOWFjYWVjYzYyZTZiMWVmOGYwYThlNiIsImlhdCI6MTYwNDAwNTgyM30.fxCf_dJpD0zp4i0uuKOQLG0sPBkxWpPg2n9TabkOFsk";
  const {data} = useQuery(GET_USER_INFO, {variables: {
    token: token,
      context: {version: 0},
    }});
  //const userData = data;
  /*let [getBooks, {data}] = useLazyQuery(GET_USER_INFO, {variables: {
      token: token,
      //__uriExtra: "/user",
    }});*/

  const dispatch = useDispatch();

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  let username: string = "";
  if (data) {
    username = data?.userInfo?.username;
  }
  let bookList: string[] = [];
  //let username: string = "winter**"; // Get username from db?
  const newView = (view: string) => {
    changeView(view);
    if (data) {
      switch(view)  {
        case "favorites":
          bookList = data?.userInfo?.fav;
          break;
        case "wish-to-read":
          bookList = data?.userInfo?.wanted;
          break;
        case "have-read":
          bookList = data?.userInfo?.read;
          break;
        default:
          bookList = [];
      }
    }
  }
  newView(showing);
  //Change to fetch book list by ids

  console.log("Profile list", data?.bookList);

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
            <h4>Username: {username}</h4>
            <button
              id="favorites"
              className={showing + " red-button"}
              onClick={() => newView("favorites")}
            >
              Favorites
            </button>
            <button
              id="wish-to-read"
              className={showing + " red-button"}
              onClick={() => newView("wish-to-read")}
            >
              Wish to read
            </button>
            <button
              id="have-read"
              className={showing + " red-button"}
              onClick={() => newView("have-read")}
            >
              Have read
            </button>
          </div>
          <BookContainer bookList={bookList}/>
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
