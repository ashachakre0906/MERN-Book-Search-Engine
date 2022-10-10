### Description
The challenge is to take fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. It's set up to allow users to save book searches to the back end.

### User Story
```
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```
### Acceptance Criteria
```
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
```
***To complete the assignment, we will need to do the following***

- Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

- Modify the existing authentication middleware so that it works in the context of a GraphQL API.

- Create an Apollo Provider so that requests can communicate with an Apollo Server

### Code Examples and Screenshots
#### Apollo Server that uses GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
```
#### Create an Apollo Provider to make every request work with the Apollo server####
```js
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
```
<img src="./client/public/image.png">

### Technologies Used

## Technologies Used
![Javascript Badge](https://img.shields.io/badge/language-Javascript-blue.svg)
![Express Badge](https://img.shields.io/badge/backend-Express-yellow.svg)
![Node Badge](https://img.shields.io/badge/backend-Node-orange.svg)
![apollo-server-express Badge](https://img.shields.io/badge/Apolloserver-magenta.svg)
![Deployment Badge](https://img.shields.io/badge/Deployment-Heroku-green.svg)

## Credits
Thank you all TA's helping for helping me with heroku deployment.

## Questions
Please reach out to me:<br>
Email Address: chourpagar.asha@gmail.com <br>
Github Repo URL:[GitHub](https://github.com/ashachakre0906)

