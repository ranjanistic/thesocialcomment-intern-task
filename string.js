/**
 * To avoid hardcoding of general purpose strings.
 */
module.exports = {
  path: {
    ROOT: "/",
    AUTH: "/auth",
    POST: "/post",
    LOGIN: "/login",
    SIGNUP: "/signup",
    CREATE: "/create",
    REACT: "/react",
    RESPOND: "/respond",
    ALLPOSTREACT: "/all/:reaction",
    ALLPOST: "/all",
    ALLPOSTCOMMENT: "/commented",
  },
  collection: {
    USERS: "users",
    POSTS: "posts",
  },
  ROOTHTML: `
    Welcome to Priyanshu Ranjan's SocialComments Internship Task.<br/>
    Refer <a href="https://github.com/ranjanistic/socialcomments-intern-task/blob/main/README.md">this readme</a> for detailed info regarding this API.
    </br></br>
    Following are the available endpoints (POST):</br></br>
    > /auth/signup</br>
        request body = { name:String, email:String, password:String, gender:[F/M/O]:String }</br>
    > /auth/login</br>
        request body = { email:String, password:String }</br>
        You'll receive a token. Add that to your request Authorization header, or include that in request body as 'token', for following endpoints.
        </br></br>
    > /post/create</br>
        request body = { title:String, content:String, tags:Array (optional) }</br>
    > /post/react</br>
        request body = { postID:String, like:Boolean }</br>
    > /post/respond</br>
        request body = { postID:String, comment:String }</br>
    > /post/all </br>
        request body = { }</br>
    > /post/all/likers </br>
        request body = { }</br>
    > /post/all/dislikers </br>
        request body = { }</br>
    > /post/commented</br>
      request body = { }</br>`,
  AUTHHTML: `
    Following are the available endpoints (POST):</br></br>
    > /auth/signup</br>
      request body = { name:String, email:String, password:String, gender:[F/M/O]:String }</br>
    > /auth/login</br>
      request body = { email:String, password:String }</br>
      You'll receive a token. Add that to your request Authorization header, or include that in request body as 'token'.
    </br></br>`,
  POSTHTML: `
    Authorization token is required for following endpoints (POST)</br>
    > /post/create</br>
      request body = { title:String, content:String, tags:Array (optional) }</br>
    > /post/react</br>
        request body = { postID:String, like:Boolean }</br>
    > /post/respond</br>
        request body = { postID:String, comment:String }</br>
    > /post/all </br>
        request body = { }</br>
    > /post/all/likers </br>
        request body = { }</br>
    > /post/all/dislikers </br>
        request body = { }</br>
    > /post/commented</br>
  request body = { }</br>`,
  DBCONNFAILED: "Failed to connect to database",
  DBCONNSUCCESS: "Connected to database",
  DBERROR: "Database error",
  SERVERUP: "Server started",
  SERVERDOWN: "Server stopped",
  USEREXISTS: "User already exists",
  USERNOTFOUND: "User does not exist",
  CREDERROR: "Invalid credentials",
  USERCREATED: "User created",
  OBIDCHECK: "ObjectID validation",
  GENDERCHECK: "Gender key check",
  INVALIDPOST: "Invalid post",
  UNAUTHREQ: "Unauthorized request.",
  PASSREGEX: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,50}$",
  MALE: "M",
  FEMALE: "F",
  OTHERS: "O",
  INVALIDOBID: "It is an invalid ID.",
  INVALIDGENDER: `It is an invalid gender value. Must be any of 'M', 'F', 'O'.`,
  NOTFOUND: "Not found",
};
