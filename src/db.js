import mongoose from "mongoose";
import secrets from "./secrets";

const { db } = secrets;

try {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('successfully connected to database.'))
      .catch((err) => console.log(err));
} catch(err) {
  console.log(err);
}

