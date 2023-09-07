import express from "express";
import db from "./utils/database.mjs";
import Todo from "./models/todo.model.mjs";

Todo;

const PORT = 8000;

db.authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database synced."))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server stae!");
});

app.get("/todos", async (req, res) => {
  try {
    const homework = await Todo.findAll();
    res.json(homework);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const homework = await Todo.findByPk(id);
    if (!homework) {
      res.status(404).json({ message: "id not found" });
    }
    res.json(homework);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/todos", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const newHomework = await Todo.create({ title, description, completed });
    res.json({ message: "To-do created" });
  } catch (error) {
    res.status(400).json(error);
  }
});
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const homeworkId = req.params.id;
    const homework = await Todo.findByPk(id);

    if (!homework) {
      res.status(404).json({ message: "Homework not found" });
    }

    await Todo.update(
      { title, description, completed },
      { where: { id: homeworkId } }
    );

    res.json({ message: "To-do updated" });
  } catch (error) {
    res.status(400).json(error);
  }
});
app.delete("/todos/:id", async (req, res) => {
  try {
    const homeworkId = req.params.id;
    const homework = await Todo.findByPk(homeworkId);

    if (!homework) {
      return res.status(404).json({ message: " Homework not found" });
    }

    await homework.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({ err: "Error destroying To-Do" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
