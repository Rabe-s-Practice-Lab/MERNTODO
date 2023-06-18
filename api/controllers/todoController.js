import Todo from "../modals/todo.js";
import User from "../modals/user.js";

// @desc Create new todo
// @route POST /todo
// @acess Private
const createTodo = async (req, res) => {
  try {
    console.log("req.body from create Todo", req.body);
    const { content, isCompleted } = req.body;
    const id = req.User.id;
    if (!content.trim() || typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "Missing Values" });
    }

    const newTodo = new Todo({
      user: id,
      content,
      isCompleted,
    });

    await newTodo.save();

    return res.status(201).json({ message: "Todo created successfully" });
  } catch (e) {
    res.status(404).json({ message: `Something Went Wrong. Error:-- ${e}` });
  }
};

// @desc Get All Todos
// @route GET /todo/all
// @acess Private
const allTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find().lean();

    // if todo is empty just return it
    if (!allTodos?.length) {
      return res.status(200).json({ data: [], message: "No todo Found!" });
    }

    // All todos with username
    const todoWithUser = await Promise.all(
      allTodos.map(async (todo) => {
        const { username } = await User.findById(todo.user).lean();
        console.log(username);
        return { ...todo, username };
      })
    );

    /* with for...of loop
      const todoWithUser = [];
      for (let todo of await allTodos) {
        const { username } = await User.findById(todo.user).lean();
        console.log(username);
        todoWithUser.push({ ...todo, username });
        // todoWithUser = [...todoWithUser, { ...todo, username }]; (todoWithUser has to be let)
      }
    */

    console.log("todoWithUser", todoWithUser);

    return res
      .status(200)
      .json({ data: { todoWithUser, len: todoWithUser.length } });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

// @desc Get All Todos with logged User
// @route GET /todo/loggedUserTodos
// @acess Private
const allTodosWithSpecificUser = async (req, res) => {
  try {
    const userId = req.User.id;

    const allTodos = await Todo.find({
      user: userId,
    }).lean();

    // if todo is empty just return it
    if (!allTodos?.length) {
      return res.status(200).json({ data: [], message: "No todo Found!" });
    }

    const todoWithLoggedUser = [];
    for (let todo of await allTodos) {
      const { username } = await User.findById(todo.user).lean();
      todoWithLoggedUser.push({ ...todo, username });
    }

    return res
      .status(200)
      .json({ data: { todoWithLoggedUser, len: todoWithLoggedUser.length } });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" + e });
  }
};

// @desc Get a todo
// @route GET /todo/:id
// @acess Private
const singleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.User.Id", req.User.id);
    const userId = req.User.id;
    const todo = await Todo.findOne({ _id: id, user: userId }).lean();
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ data: todo });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

// @desc Update a Todo
// @route PUT /todo/:id
// @acess Private
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.User.id;
    const { content, isCompleted } = req.body;

    if (!content.trim() || typeof isCompleted !== "boolean") {
      return res.status(400).json({
        message: "Must provide required value and type",
      });
    }

    const todo = await Todo.findOne({ _id: id, user: userId });
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

// @desc Delete a Todo
// @route DELETE /todo/:id
// @acess Private
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.User.id;
    if (!id) throw new Error("Invalid Id");
    const deleteResult = await Todo.deleteOne({ _id: id, user: userId });

    if (deleteResult.deletedCount === 0) {
      throw new Error("Todo not found");
    }

    return res.status(200).json({ message: "successfully removed todo" });
  } catch (e) {
    res.status(404).json({ message: "Something Went Wrong " + e });
  }
};

export {
  createTodo,
  allTodos,
  singleTodo,
  updateTodo,
  deleteTodo,
  allTodosWithSpecificUser,
};
