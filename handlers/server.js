const string = require("../string");

module.exports = {
  startUp: (host, port) => {
    console.log(string.SERVERUP, host, port);
  },
  root: (req, res) => {
    res.send(`
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
            request body = { }</br>

    `);
  },
  notFound: (req, res) => {
    res.status(404);
    res.format({
      json: () => {
        res.json({ error: string.NOTFOUND });
      },
      default: () => {
        res.type("txt").send(string.NOTFOUND);
      },
    });
  },
};
