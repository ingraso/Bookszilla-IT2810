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
/*
export const getAllBooks = () => {
  let {loading, error, data} = useQuery(GET_ALL_BOOKS);
  return data.books;
}*/

/*const GetBookData = (props: any) => {
  let books : Book[] = [];
  props.data?.books?.forEach((b:any) => {
    let book : Book = {title: b.title, author: b.author, genres: b.genres, image: b.image};
    books.push(book);
  });
  console.log(props.data.books);
  return (
    <div>
        {props.data?.books?.map((b: Book) => (
          <object>
            <li><a>{b.title}{b.author}{b.genres}{b.image}</a></li>
          </object>
        ))}
    </div>
  );
};


export default graphql(GET_BOOK_INFO)(GetBookData);*/