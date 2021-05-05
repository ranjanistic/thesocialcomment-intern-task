require("dotenv").config();
const env = process.env;

module.exports = {
  NODE_ENV: env.NODE_ENV,
  PROJECTKEY: env.PROJECTKEY,
  SESSIONKEY: env.SESSIONKEY,
  DBNAME: env.DBNAME,
  DBURL: env.DBURL,
};
