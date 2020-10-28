import { gql } from "@apollo/client";

interface Book {
  title: string;
  author: string;
  genres: string[];
  image: string;
}

export const GET_ALL_BOOKS = gql`
  query Books($page: Int, $size: Int) {
    books(page: $page, size: $size) {
      id
      title
      author
      genres
      image
    }
  }
`;
