import jwt from 'jsonwebtoken';
import secret from '../secrets';

const { pass } = secret;
function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }
  jwt.verify(token, pass, (err, decoded) => {
    if(err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    // on success, save request for use in other routes
    req.userTokenId = decoded.id;
    next();
  });
}

export default verifyToken;
