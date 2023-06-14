import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
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
    timeStamp: true,
  }
);

const todo = mongoose.model("Todo", todoSchema);
export default todo;
