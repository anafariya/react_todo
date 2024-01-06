const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://anafariya:khushijoy786@cluster0.kr3nsus.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = {
    Todo
};
