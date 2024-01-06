const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db"); // Updated import for the Todo model
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }
    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });

    res.json({
        msg: "Todo created",
    });
});

app.get("/todos", async function (req, res) {
    const todos = await Todo.find({});

    res.json({
        todos,
    });
});

app.put("/completed", async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    await Todo.updateOne(
        {
            _id: req.body.id,
        },
        {
            completed: true,
        }
    );

    res.json({
        msg: "Todo marked as complete",
    });
});

app.listen(3000);