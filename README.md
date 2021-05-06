# SocialComments API Task

By [Priyanshu Ranjan](https://github.com/ranjanistic).

This API is hosted [here](https://socialcomment.herokuapp.com/).

[![Heroku Deploy](https://github.com/ranjanistic/socialcomments-intern-task/actions/workflows/main.yml/badge.svg)](https://github.com/ranjanistic/socialcomments-intern-task/actions/workflows/main.yml)

## Environment Setup

Copy contents of [.sample.env](/.sample.env) and paste in a new .env file, and set the values accordingly.

### Prerequisites

- NodeJS v14.x or above

_Developed on NodeJS v15.4.0._

### Dependencies used

- bcrypt
- cors
- dotenv
- express
- helmet
- joi
- jsonwebtoken
- mongodb

### Install dependencies

```bash
npm install
```

### Run server

```bash
npm run server
```

### Run integrity tests

```bash
npm test
```

## Endpoints

_All endpoints accept **POST** request method only, unless specified._

- Register User ```/auth/signup```
  - Request Body
    - name:String
    - email:String
    - gender:String (M/F/O)
    - password:String

  - Response
    - userID:String
    - ok:Boolean

- Login User ```/auth/login```
  - Request Body
    - email:String
    - password:String

  - Response
    - userID:String
    - token:String
    - ok:Boolean

  > The provided token contains the userID. This token is required for authorization.

_NOTE: For following endpoints, either the **Authorization header** needs to have the **token** provided on login, **OR** the **request body should contain** ```token``` key with the token._

- Create Post ```/post/create```
  - Request Body
    - title: String
    - content: String
    - tags: Array(String)
  
  - Response
    - postID: String
    - ok: Boolean

- Post like/dislike ```/post/react```
  - Request Body
    - postID: String
    - like: Boolean (true/false)
  
  - Response
    - postID: String
    - ok: Boolean

- Post comment ```/post/respond```
  - Request Body
    - postID: String
    - comment: String
  
  - Response
    - postID: String
    - ok: Boolean

- All posts with liked users ```/post/all/likers```
  - Request Body
  
  - Response
    - ok: Boolean
    - posts: Array (List of posts)

- All posts with user's comment ```/post/commented```
  - Request Body
  - Response
    - ok: Boolean
    - posts: Array (List of posts)

### Extra endpoints

- All posts of user ```/post/all```
  - Request Body
  
  - Response
    - ok: Boolean
    - posts: Array (List of posts)

- All posts with disliked users ```/post/all/dislikers```
  - Request Body
  
  - Response
    - ok: Boolean
    - posts: Array (List of posts)

## Footnotes

- _Actions CI & CD is enabled for branch:main._
- _Actions CI & testing is enabled for pull requests to branch:main._
