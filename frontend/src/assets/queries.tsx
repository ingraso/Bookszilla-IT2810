import { gql } from "@apollo/client";

export const GET_BOOKS_BY_SEARCH = gql`
  query BooksBySearch(
    $search: String
    $filters: [String]
    $page: Int
    $size: Int
    $sortBy: String
  ) {
    booksBySearch(
      search: $search
      filters: $filters
      page: $page
      size: $size
      sortBy: $sortBy
    ) {
      id
      title
      author
      genres
      image
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query BookById($id: ID!) {
    bookById(id: $id) {
      id
      title
      author
      genres
      image
    }
  }
`;

export const GET_BOOK_LIST_BY_IDS = gql`
  query BooksById($page: Int, $size: Int, $ids: [ID!]) {
    booksByIds(page: $page, size: $size, ids: $ids) {
      id
      title
      author
      genres
      image
    }
  }
`;

export const GET_USER_INFO = gql`
  query UserInfo($token: String) {
    userInfo(token: $token) {
      username
      read
      wanted
      fav
    }
  }
`;

export const UPDATE_USERS_BOOK_LISTS = gql`
  mutation UpdateLists(
    $readList: [String]
    $wantedList: [String]
    $favList: [String]
    $token: String
  ) {
    updateLists(
      readList: $readList
      wantedList: $wantedList
      favList: $favList
      token: $token
    ) {
      id
      read
      wanted
      fav
    }
  }
`;
