/**
 * A file to initialize the data in the database. Is only run once, after the database has been cleared of previous data.
 */

import { gql, useMutation } from "@apollo/client";
import React from "react";
const papa = require("papaparse");

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String
    $author: String
    $genres: [String]
    $image: String
  ) {
    books(title: $title, author: $author, genres: $genres, image: $image) {
      id
      title
      author
      genres
      image
    }
  }
`;

function InitData({
  initializeData,
  falseInitializeData,
}: {
  initializeData: boolean;
  falseInitializeData: any;
}) {
  const [createBook] = useMutation(CREATE_BOOK);
  if (initializeData) {
    console.log("Initializing data");

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://raw.githubusercontent.com/uchidalab/book-dataset/master/Task2/book32-listing.csv";

    papa.parse(proxyurl + url, {
      download: true,
      headers: false,
      step: function (row: { data: string[] }) {
        createBook({
          variables: {
            title: row.data[3],
            author: row.data[4],
            genres: row.data[6],
            image: row.data[2],
          },
        });
      },
      complete: function () {
        console.log("Done initializing data");
      },
    });
    falseInitializeData();
  }

  return <div />;
}

export default InitData;
