import Todo from "../modals/todo.js";

//@desc All Todos
//@method GET
//@route /todo/all
const allTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    return res.status(200).json({ data: { allTodos, len: allTodos.length } });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

//@desc Create todo
//@method POST
//@route /todo
const createTodo = async (req, res) => {
  try {
    console.log("req.body from create Todo", req.body);
    const { content, isCompleted } = req.body;
    if (!content.trim() || typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "Missing Values" });
    }

    const newTodo = new Todo({
      content,
      isCompleted,
    });

    await newTodo.save().catch((e) => {
      throw new Error(e);
    });

    return res.status(201).json({ message: "Todo created successfully" });
  } catch (e) {
    res.status(404).json({ message: `Something Went Wrong. Error: ${e}` });
  }
};

//@desc Specific todo
//@method GET
//@route /todo/:id
const singleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.User.Id", req.User.id);
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ data: todo });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

//@desc Update Todo
//@method PUT
//@route /todo/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, isCompleted } = req.body;

    if (!content.trim() || typeof isCompleted !== "boolean") {
      return res.status(400).json({
        message: "Must provide required value and type",
      });
    }

    const todo = await Todo.findOne({ _id: id });
    console.log("todo update", todo);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.content = content || todo.content;
    todo.isCompleted = isCompleted ?? todo.isCompleted;

    await todo.save().catch((e) => {
      throw new Error(e);
    });

    return res.status(200).json({ message: "successfully updated the todo" });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" + e });
  }
};

//@desc Remove a Todo
//@method DELETE
//@route /todo/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid Id");
    const deleteResult = await Todo.deleteOne({ _id: id });
    console.log("deleteResult", deleteResult);

    if (deleteResult.deletedCount === 0) {
      throw new Error("Todo not found");
    }

    return res.status(200).json({ message: "successfully removed todo" });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong " + e });
  }
};

export { createTodo, allTodos, singleTodo, updateTodo, deleteTodo };
