/**
 * To avoid hardcoding of general purpose strings.
 */
module.exports = {
  path:{
    ROOT:"/",
    AUTH:"/auth",
    POST:"/post",
    LOGIN: "/login",
    SIGNUP: "/signup",
    CREATE:"/create",
    REACT:"/react",
    RESPOND:"/respond",
    ALLPOSTREACT:"/all/:reaction",
    ALLPOST:"/all",
    ALLPOSTCOMMENT:"/commented",
  },
  collection:{
    USERS:"users",
    POSTS:"posts",
  },
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
  NOTFOUND:"Not found"
};
