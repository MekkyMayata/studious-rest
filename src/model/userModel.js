import userSchema from '../schema/userSchema';
import mongoose from 'mongoose';

const userModel = mongoose.model('user', userSchema);

export default userModel;