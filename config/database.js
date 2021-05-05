const {MongoClient} = require("mongodb"), {DBURL,DBNAME} = require("./env");

let db;

module.exports={
    initDBConnection:(onConnect)=>{
        MongoClient.connect(
            DBURL,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
              if (!err) db = client.db(DBNAME);
              return onConnect(err, DBNAME);
            }
        )
    }
}