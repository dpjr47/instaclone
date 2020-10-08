# Instaclone using MERN stack


### [Client](https://github.com/kiranmurali93/instaclone/tree/main/client) cointains the frontend which is made using [React](https://github.com/facebook/create-react-app)

### [Server](https://github.com/kiranmurali93/instaclone/tree/main/server) cointains the server side part

## How To use 

- Clone this repo
- Open Up both [Client](https://github.com/kiranmurali93/instaclone/tree/main/client) and [Server](https://github.com/kiranmurali93/instaclone/tree/main/server) in the terminal
- run 
  
        npm install

- Make a file keys.js in server folder
- Make a account in [Mongodb Atlas](https://account.mongodb.com/account/login)
-  Add this in keys.js
     
        module.exports = {
        MONGOURI: '<atlas key>',
        JWT_SECRET: '<secret key can be any thing>',
        };

- To start the server

        npm start

- use localhost 3000 to view in browser 

        http://localhost:3000


