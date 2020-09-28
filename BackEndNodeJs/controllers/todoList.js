const db = require('../models');

const getTodoList = async (req, res) => {
    const todoList1 = await db.TodoList.findAll({ where: { user_id: req.user.id, priority: 1 } })
    const todoList2 = await db.TodoList.findAll({ where: { user_id: req.user.id, priority: 0 } })
    const todoList = todoList1.concat(todoList2)
    res.status(200).send(todoList);
};

const addTodoList = async (req, res) => {
    const newTodo = await db.TodoList.create({
        task: req.body.task,
        detail: req.body.detail,
        user_id: req.user.id
    });

    res.status(201).send(newTodo);
};

const deleteTodoList = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetTodo = await db.TodoList.findOne({ where: { id: targetId, user_id: req.user.id } })
    if (targetTodo) {
        await targetTodo.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: "todo list not found" })
    }

};


const updateTodoList = async (req, res) => {
    const targetId = Number(req.params.id);
    const newTask = req.body.task;
    const newDetail = req.body.detail;
    const newPriority = req.body.priority
    const targetTodo = await db.TodoList.findOne({ where: { id: targetId, user_id: req.user.id } });
    if (targetTodo) {
        await targetTodo.update({
            task: newTask,
            detail: newDetail,
            priority: newPriority
        });
        res.status(200).send(newTask)
    } else {
        res.status(404).send({ message: "todo list not found" })
    }
};

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList,
};