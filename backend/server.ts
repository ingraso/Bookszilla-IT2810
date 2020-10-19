const graphql = require('graphql').graphql;
const express = require('express');
const graphQLHTTP = require('express-graphql');
const Schema = require('./schema.ts');

//This is an internal test
const query = 'query { books { id, title, completed } }';
// @ts-ignore
graphql(Schema, query).then(function (result) {
  console.log(JSON.stringify(result,null," "));
});

const app = express()
  .use('/', graphQLHTTP({ schema: Schema, pretty: true}))
  .listen(8080, function () {
    console.log("GraphQL Server is now running on localhost:8080");
  });
