import dotenv from "dotenv";

dotenv.config();

export default {
  db: process.env.DB_CONNECT,
  port: process.env.PORT,
  pass: process.env.TOKEN
};