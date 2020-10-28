import React from "react";
import { graphql } from "react-apollo";
//import { gql } from "apollo-boost";
import { gql, useQuery } from '@apollo/client';

interface Book {
  title: string;
  author: string;
  genres: string[];
  image: string;
}

export const GET_ALL_BOOKS = gql`
  {
   books{
     id
     title
     author
     genres
     image
   }
  }
`;
