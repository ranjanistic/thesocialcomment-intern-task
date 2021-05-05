const express = require("express"),
  server = express(),
  string = require("./strings"),
  handler = require("./handlers/server")
  helmet = require("helmet"),
  { initDBConnection } = require("./config/database");

server.use(helmet());
server.use(express.json());

initDBConnection((error, dbname) => {
  if (error) return console.log(string.DBCONNFAILED);
  console.log(string.DBCONNSUCCESS, dbname);

  server.get("/", handler.root);

  server.use("/auth", require("./routes/auth"));
  server.use("/post", require("./routes/post"));
  
  server.use(handler.notFound)
  const port = process.env.PORT || 5000 || 80,
    host = "0.0.0.0" || "localhost";
  server.listen(port, host, () => {
    console.log(string.SERVERUP, host, port);
  });
});
