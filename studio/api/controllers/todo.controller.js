import db from "../models/index.js";
const Todo = db.todo;

// Get all todos for the authenticated user
export const getTodos = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const todos = await Todo.findAll({ where: { uid: userId } });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Get a single todo by ID (with user join if needed)
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id },
      // include: [{ model: db.user, attributes: [] }] // Uncomment if you want user info
    });
    if (!todo) return res.status(404).json("Todo not found");
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Add a new todo
export const addTodo = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    await Todo.create({
      text: req.body.text,
      day: req.body.day,
      reminder: req.body.reminder,
      uid: userId,
    });
    return res.json("todo has been created.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const deleted = await Todo.destroy({
      where: { id: req.params.id, uid: userId },
    });
    if (!deleted) return res.status(403).json("You can delete only your todo!");
    return res.json("todo has been deleted!");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const [updated] = await Todo.update(
      {
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder,
      },
      {
        where: { id: req.params.id, uid: userId },
      }
    );
    if (!updated) return res.status(403).json("You can update only your todo!");
    return res.json("todo has been updated.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};