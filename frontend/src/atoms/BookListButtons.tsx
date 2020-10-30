import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO, UPDATE_USERS_BOOK_LISTS } from "../assets/queries";
import { USER_URL } from "../index";
import {useSelector} from "react-redux";

/**
 * Returns buttons, that adds the current displayed book to the correct
 * user list.
 * @var bookId is the id of the book currently being displayed.
 * @var token is the current users jwt token.
 */

const BookListButtons = () => {
  const token: string = useSelector((state: any) => state.loginStatus.token);
  const bookId: any = useSelector((state: any) => state.id.id);
  const [getUser, { data }] = useLazyQuery(GET_USER_INFO, {
    context: { uri: USER_URL },
  });
  const [updateUser] = useMutation(UPDATE_USERS_BOOK_LISTS, {
    context: { uri: USER_URL },
  });

  const addToUserList = (list: string) => {
    getUser({ variables: { token: token } });
    if(data) {
      switch (list) {
        case "read":
          updateUser({
            variables: {
              readList: [data?.userInfo?.read, bookId],
              wantedList: data?.userInfo?.wanted,
              favList: data?.userInfo?.fav,
              token: token,
            },
          });
          break;
        case "wanted":
          updateUser({
            variables: {
              readList: data?.userInfo?.read,
              wantedList: [...data?.userInfo?.wanted, bookId],
              favList: data?.userInfo?.fav,
              token: token,
            },
          });
          break;
        case "fav":
          updateUser({
            variables: {
              readList: data?.userInfo?.read,
              wantedList: data?.userInfo?.wanted,
              favList: [...data?.userInfo?.fav, bookId],
              token: token,
            },
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <button
        id="favorite-button"
        className="red-button"
        onClick={() => {
          addToUserList("fav");
        }}
      >
        Favorite
      </button>
      <button
        id="wish-to-read-button"
        className="red-button"
        onClick={() => {
          addToUserList("wanted");
        }}
      >
        Wish to read
      </button>
      <button
        id="have-read-button"
        className="red-button"
        onClick={() => {
          addToUserList("read");
        }}
      >
        Have read
      </button>
    </>
  );
};

export default BookListButtons;
