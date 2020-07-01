import app from "./app";
import db from "./db";

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});

module.exports = server;
