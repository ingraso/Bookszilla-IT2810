import { gql } from "@apollo/client";

interface Book {
  title: string;
  author: string;
  genres: string[];
  image: string;
}

export const GET_ALL_BOOKS = gql`
  query Books($page:Int, $size:Int) {
    books(page:$page, size:$size){
     id
     title
     author
     genres
     image
    }
  }
`;

export const GET_BOOKS_BY_SEARCH = gql`
  query BooksBySearch($search: String, $filters: [String], $page:Int, $size:Int) {
    booksBySearch(search: $search, filters:$filters, page:$page, size:$size){
     id
     title
     author
     genres
     image
    }
  }
`;
