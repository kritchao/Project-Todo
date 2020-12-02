const db = require('./index')
const todoList_db = db.collection('todoList');


const addTodoList = async (req, res) => {
    const newTodo = todoList_db.doc();
    await newTodo.set({
        id: newTodo.id,
        user_id: req.user,
        task: req.body.task,
        detail: req.body.detail,
        date: req.body.date,
        priority: "0"
    });
    res.status(201).send({ message: "added todo-List" });
};

const getTodoList = async (req, res) => {
    const target = await todoList_db.where('user_id', '==', req.user).get()
    const result = [];
    target.forEach(doc => {
        result.push(doc.data())
    })
    res.status(200).send(result);
};

const getImpList = async (req, res) => {
    const target = await todoList_db.where('user_id', '==', req.user).where('priority', '==', true).get()
    const result = [];
    target.forEach(doc => {
        result.push(doc.data())
    })
    res.status(200).send(result);
}


const deleteTodoList = async (req, res) => {
    const targetId = req.params.id
    const target = await todoList_db.where('user_id', '==', req.user).get()
    if (!target.empty) {
        await todoList_db.doc(targetId).delete();
        res.status(204).send({ message: "deleted" });
    } else {
        res.status(404).send({ message: "todo list not found" })
    }

};


const updateTodoList = async (req, res) => {
    const targetId = req.params.id;
    const newTask = req.body.task;
    const newDetail = req.body.detail;
    const newDate = req.body.date
    const target = await todoList_db.where('user_id', '==', req.user).get()
    if (!target.empty) {
        await todoList_db.doc(targetId).update({
            task: newTask,
            detail: newDetail,
            date: newDate
        });
        res.status(200).send({ message: "updated" })
    } else {
        res.status(404).send({ message: "todo list not found" })
    }
};

const togglePriority = async (req, res) => {
    const targetId = req.params.id;
    const newPriority = req.body.priority
    const target = await todoList_db.where('user_id', '==', req.user).get()
    if (!target.empty) {
        await todoList_db.doc(targetId).update({
            priority: newPriority
        });
        res.status(200).send({ message: "updated" })
    } else {
        res.status(404).send({ message: "todo list not found" })
    }

}

module.exports = {
    getTodoList,
    addTodoList,
    deleteTodoList,
    updateTodoList,
    getImpList,
    togglePriority
};