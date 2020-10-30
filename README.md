# Search - IT2810 group 20

## How to run the project

Connect to the NTNU network through a VPN service.
In a terminal, write:

`cd backend`

`npm install`

`npm start`

Open new terminal

`cd frontend/src`

`npm install`

`npm start`

(More information on how to interact with / manually test the backend server can be found in the README in the backend folder.)

### How to run snapshot and unit tests

`cd frontend/src`

`npm test`

### How to run Cypress (E2E) tests

`npx cypress open`

Press “Run all specs” in the Cypress UI.

## Folder structure

- /backend
- /frontend
- /cypress
  - /integration: The Cypress tests
- /public
- /src
  - /\_\_tests\_\_: All the tests in the project
  - /api: All communication with the API, as well as mock data
  - /atoms: Child components, which are the smallest components
  - /containers: Parent components, which include other components
  - /redux
    - /actions: Redux actions
    - /reducers: Redux reducers
    - /store: Redux store
  - /styles: All CSS-files

## About this webpage

We have created Bookszilla, a webpage where users can search for books. Our books can be filtered by genre, sorted alphabetically by author or title in ascending or descending order, and you can search on the book’s title or author, either with a full or partial search. If you click on a book on the main page, a detailed view of the book will appear on the right. If the user is logged in, they can then add the book to their “favorites”, “wish to read” or “have read”-lists, which can later be found in their profile. To avoid loading the entire dataset at once, we used offset-based pagination to show 18 books at each page.

## Design

The amount of pages a user could navigate between is dependent on the user’s screen size. On desktops a user has two pages to move between: the main page and the profile page. To make the design responsive for smaller screens, a navbar with four different pages (profile, main page, detailed-book and filters) appears when the screen width is less than 850px.

To create the webpage we also used [react-icons](https://react-icons.github.io/), a library that makes it easy to use SVG-icons. We tried to use Material Design icons as often as possible, but had to use some symbols from other icon groups.

## React and TypeScript

This project was initialized using [create-react-app](https://github.com/facebook/create-react-app), and we have used TypeScript. TypeScript was especially useful to make sure that the data sent to the database had the correct type. In this project we only used functional components, to be consistent and make the code more readable.

## State management

We used Redux for state management. The group considered both Redux and MobX, but chose Redux because it has a bigger online community, great documentation and the members of the group wanted to learn it, as it is widely used professionally. Redux would also be more scalable over time, which we took into consideration. We used Redux for all states that were used and updated from several components that were not close to each other in the hierarchy. We used the Dispatch-hook to change the states. Most of our reducers only return a new state, except for loginStatusReducer, which also updates session storage. This way, when the page refreshes the user will remain logged in.

## Data Storage and Interaction

### The Database

We’ve chosen to use [MongoDB](https://www.google.com/url?q=https://www.mongodb.com/&sa=D&ust=1604078344038000&usg=AOvVaw1Bh_4e3GGWrmR2aI7OyTac) as our database technology on the provided virtual machine. MongoDB has good documentation, and is popular enough that most problems have been encountered by others before, making it easy to troubleshoot. It also integrates well with GraphQL, which we intended on using. The database has been set up to allow external access (by units within the NTNU network). It consists of an admin database to manage users and the SearchDB database where the project’s data is stored. SearchDB has two collections: books and users. Each user has an id, a username, an encrypted password and three lists (fav, read and wanted) of book ids. Each book has a unique id, a link to the corresponding image hosted on Amazon, a title, an author and a list of genres. This information has been retrieved from the dataset found [here](https://www.google.com/url?q=https://github.com/uchidalab/book-dataset/tree/master/Task2&sa=D&ust=1604078320211000&usg=AOvVaw1F5SkzJxXB2vK6GIYYDFwa). This was the best dataset we could find that contained book genres, but ideally we would have found one with more genres than one per book. Our code is set up to handle more genres per book, if we were to find a better dataset later in development.

The reason we’ve chosen to store the images as urls pointing to an external site, instead of the images themselves (i.e. as base64 encoded bin files or using GridFS), is mainly because we wanted to use GraphQL to retrieve and update the books, as GraphQL would make search and filtering easier. Since GraphQL only sends json, handling image files would have required a more complex solution with other third-party components.

### The Backend Server

The backend server is set up using [Express](https://www.google.com/url?q=https://expressjs.com/&sa=D&ust=1604078373710000&usg=AOvVaw2qik9ZorxTT63vr5BBzVDk) and [Express-GraphQL](https://www.google.com/url?q=https://github.com/graphql/express-graphql&sa=D&ust=1604078420925000&usg=AOvVaw0wFfbi6U98Kst5-rUjwE8Y), to facilitate GraphQL queries and mutations from the frontend client. [CORS](https://www.google.com/url?q=https://www.npmjs.com/package/cors&sa=D&ust=1604078526087000&usg=AOvVaw3KazblBCPlyl5QmdYl38Xm) is used to prevent Same-Origin Policy(SOP) related issues. [Mongoose](https://www.google.com/url?q=https://mongoosejs.com/&sa=D&ust=1604078550785000&usg=AOvVaw3xTAqgs27kYnr13LqxRVh6) is used to create models and schemas that work with MongoDB. All of these third party components are well documented and widely used, with many good tutorials and forum / Stack Overflow posts to help us learn how they work.

For the book collection, one mutation and three queries are set up:
BooksByIds: a query that finds a list of books corresponding to the received list of ids.
BookById: a query that finds the book corresponding to the given id.  
BooksBySearch: a query that finds the books in the given genres (if any) that contains the given search term in either the title or author of the book. The response is sorted based on the given sortBy string.
CreateBook: a mutation that stores a new book in the database with the given parameters. This is only used to transfer the dataset into our database with the initializeData.ts script
For the user collection there is one query and one mutation for GraphQL set up:
UserInfo: a query that finds the username and book lists of a user given a valid jwt token.
UpdateLists: a mutation that updates a user’s book lists based on the given jwt token and list parameters.

We use a REST API to handle user authentication, which has two endpoints:

http://localhost:3001/auth/register

and

http://localhost:3001/auth/login

The reason why the REST API is chosen over GraphQL for user authentication is that it is well-known, and easy to implement and use. We prioritized an api that was easy to implement because the user authentication was not a main focus of the project.
The third party component bcrypt is used to encrypt and decrypt the users' passwords. It is a well-known library for hashing passwords, that we implemented by generating a salt and then hash on separate function calls. To further explore bcrypt, one can go [here](https://www.npmjs.com/package/bcrypt).

The backend server was initially meant to run on the virtual machine, but we ran into problems when setting this up, and decided that the time spent solving the problem would be better spent working on other parts of the project that were more related to the learning objectives and would have a bigger impact on the final product. Instead the server is run locally.

## The Client-side API Interaction

To interact with the GraphQL API provided by the backend server, [@Apollo/client](https://www.google.com/url?q=https://www.apollographql.com/docs/react/&sa=D&ust=1604078591880000&usg=AOvVaw3LK5pyW-v4ScOI23eWAPq0) is used. Apollo makes GraphQL interactions simple through the useQuery() and useMutation() hooks.

For user authentication, a user inputs the desired username and password in a form. When the form is submitted, a call to the server is made by using the Fetch API, as described [here](https://www.freecodecamp.org/news/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples/).

## Testing

### Automatic end-to-end testing

We use Cypress for automatic End-to-end (E2E) testing. Cypress is a well-known and well-documented tool for E2E-testing, which is why we use this tool. To learn Cypress, we used the [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). When testing, we thought about how a user would interact with the webpage. Therefore we created E2E tests that test the user interactions, register and sign in. In addition, we tested interacting with a book to get a detailed view, and that this worked as expected for both authenticated and unauthenticated users.

### Unit testing

The bookContainer test ensures that when a user visits the web page, and the book container renderes, the user is directed to the "home" page.Cypress can also be used for unit testing. Therefore, our Cypress-tests test different situations. For example, the loginForm spec tests that the input fields are visible and possible to type into. In addition, we test that the user gets the correct feedback on incorrect form input.

### Snapshot testing

We decided not to use snapshot tests in this project because the code would often be changed in this time period. Therefore we thought other tests would be more useful, by showing that e.g. user interaction works as expected.

## Workflow

Issues in GitLab were used to keep track of which tasks were available, ongoing and done. Each branch, commit and merge request refers to an issue by the issue's number. We also implemented the policy that each merge request had to be reviewed by one other group member before merging.

## Sources

- Backend server setup: https://medium.com/better-programming/full-stack-react-graphql-mongodb-apollo-building-an-app-cb1eb647c73a
- Redux: https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd
- User authentication with REST API https://codeburst.io/to-handle-authentication-with-node-js-express-mongo-jwt-7e55f5818181
- Fetch and REST API https://www.freecodecamp.org/news/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples/
- REST OK response https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok

## Known bugs

- Adding to the favourite, read and wanted lists worked until one of the last merges. Now there is a bug that the query to get userInfo in BookListButtons.ts sometimes returns undefined. The mutation to update said lists doesn’t change the user at all most of the time, but sometimes it works. This seems related to when the user logs out and in again, but we don’t have time to investigate it further.
- A user should not be logged out on reload, which is a bug we wanted to solve. We tried to solve this with session storage, but did not have time to make it work as desired.
- If you press “SIGN IN” you can scroll down and press books, which should not be possible.
- Now it is possible to go to the next page, even though there are no more books. If we had more time, we would have fixed this, by e.g. adding a check to see if you get data from the database.
