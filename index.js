const app = require('./app');
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});

console.log(server);

module.exports = server;