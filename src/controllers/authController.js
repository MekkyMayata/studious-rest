import express from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import bodyParser, { raw } from 'body-parser';
import secret from '../secrets';
import userModel from '../model/userModel';
import token_middleware from '../custom-middleware/token-middleware';
import { check, validationResult } from 'express-validator';

let { pass } = secret;

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// router.use(token_middleware());

// signup endpoint
router.post('/signup', [
  check('firstname').isLength({ min: 3 }).trim().escape(),
  check('username').isLength({ min: 3 }).trim().escape(),
  check('email').isEmail().normalizeEmail(),
  check('password').isAlphanumeric()
], (req, res) => {
  // input valid and sanitized?
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  // hash user password
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  // create user
  userModel.create({
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    password: passwordHash
  }, (err, user) => {
    // handle error
    if(err) {
      console.log(err);
      return res.status(500).send("Error occurred during sign-up.");
    }
    // create token
    let token = jwt.sign({ id: user._id }, pass, {expiresIn: 86400});
    res.status(200).send({ auth: true, token: token });
  });
});

router.get('/user', token_middleware, (req,res, next) => {
  // get the supplied token
  userModel.findById(req.userTokenId, { password: 0 }, (err, user) => {
    if(err) {
      return res.status(500).send("Error finding user.");
    }
    if(!user) {
      return res.status(404).send("User does not exist.");
    }
    res.status(200).send(user);
  });
});

// login
router.post('/login', (req,res) => {
  const email = req.body.email;
  const rawPassword = req.body.password;
  let failed = 'Incorrect email or password';
  userModel.findOne({ email: email }, (err, user) => {
    // server error?
    if(err) {
      console.log(err);
      return res.status(500).send('Server error.');
    }
    if(!user) {
      return res.status(404).send(failed);
    }
    const passwordValidate = bcrypt.compareSync(rawPassword, user.password);
    if(!passwordValidate) {
      return res.status(401).send({ auth: false, token: null, message: failed});
    }
    const token = jwt.sign({ id: user._id }, pass, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  });
});

// update
router.put('/user/id/:id', [
  check('username').isLength({ min: 3 }).trim().escape()
], (req, res) => {
  // validated and sanitized?
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  // get old password and new password
  const newUsername = req.body.username;
  const id = req.params.id;
  userModel.findOne({ _id: id }, { password: 0 }, (err, user) => {
    if(err) {
      return res.status(500).send('Server error.');
    }
    if(!user) {
      return res.status(404).send('Invalid');
    }
    user.username = newUsername;
    user.save()
    .then(user => {
      return res.status(200).send(user);
    }).catch(error => {
      return res.status(400).send(error);
    });
  });
});

export default router;
