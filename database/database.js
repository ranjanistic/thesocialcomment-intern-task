const { MongoClient } = require("mongodb"),
  { DBURL, DBNAME } = require("../config/env");
const {collection:{POSTS,USERS}} = require("../string");

let db;

module.exports = {
  initDBConnection: (onConnect) => {
    MongoClient.connect(
      DBURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (!err) db = client.db(DBNAME);
        return onConnect(err, DBNAME);
      }
    );
  },
  /**
   *
   * @returns {import("mongodb").Collection}
   */
  Users: () => db.collection(USERS),
  /**
   *
   * @returns {import("mongodb").Collection}
   */
  Posts: () => db.collection(POSTS),
};
