This readme is intended for development purposes.
For the documentation of the project, see the readme-file in the main folder.

## Useful database commands
- Connecting to the vm (use Git Bash if windows): <br/>``ssh <username>@it2810-20.idi.ntnu.no``
- Checking if the database is running: ``sudo service mongod status``
- Starting the database: ``sudo service mongod start``
- Restarting the database: ``sudo service mongod restart``
- Stopping the database: ``sudo service mongod stop``

## How to run the backend server locally
 - Make sure you're connected to the ntnu vpn
 - ```cd backend```
 - ```npm install``` (if you haven't already)
 - ```npm start```
 - To test backend queries you can now go to [localhost:3001/book]() and [localhost:3001/user]()
 
 ## Implemented Queries and mutations
Get all books (parameters can be removed if not needed):
 ```
{
   books{
     id
     title
     author
     genres
     image
   }
}
```
Get book by id: 
```
{
  bookById(id:"<id>"){
    id
    title
    author
    genres
    image
  }
}
```
Create new book (Remember to change query variables):
```
mutation CreateBook($title:String, $author:String, $genres:[String],$image:String){
  books(title:$title, author:$author, genres:$genres, image:$image){
    id,
    title,
    author,
    genres,
    image
  }
}
```
(In Query Variables write i.e.:)
```
{
  "title":"Test Title",
  "author":"Test Author",
  "genres":["genre1", "genre2"],
  "image":"testURL"
}
```
