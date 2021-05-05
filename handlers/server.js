const string = require("./../strings");

module.exports = {
  startUp: (host, port) => {
    console.log(string.SERVERUP, host, port);
  },
  root: (req, res) => {
    res.send(`
        Welcome to Priyanshu Ranjan's SocialComments Internship Task.
        </br></br>
        Following are the available endpoints (POST):</br></br>
        > /auth/login</br>
            body = { email:String, password:String }</br>
        > /auth/signup</br>
            body = { name:String, email:String, password:String, gender:[F/M/O]:String }</br>
        > /post/create</br>
            body = { email:String, password:String }</br>
        > /post/react</br>
            body = { email:String, password:String }</br>
        > /post/respond</br>
            body = { email:String, password:String }</br>
    `);
  },
  notFound: (req, res) => {
    res.status(404);
    res.format({
      json: () => {
        res.json({ error: "Not found" });
      },
      default: () => {
        res.type("txt").send("404: Not found");
      },
    });
  },
};
