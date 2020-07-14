import mongoose from 'mongoose';

const userSchema = mongoose.Schema;

const user = new userSchema({
  first_name: 'String',
  username: 'String',
  email: 'String',
  password: 'String',
  user_since: { type: Date, default: Date.now}
});

export default user;