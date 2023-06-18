import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    isCompleted: {
      type: Boolean,
      required: [true, "Status must be stated"],
    },
  },
  {
    timestamp: true,
  }
);

const todo = mongoose.model("Todo", todoSchema, "todos");
export default todo;
