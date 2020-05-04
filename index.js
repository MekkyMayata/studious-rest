const app = require('./app');
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});


module.exports = server;