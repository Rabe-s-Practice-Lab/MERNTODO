import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    occupation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const db = mongoose.model("User", userSchema);
export default db;
