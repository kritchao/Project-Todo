const express = require('express');
const router = express.Router();
const todoListContollers = require('../controllers/todoList');
const passport = require('passport');

const authentication = passport.authenticate("jwt", { session: false });

router.get('/all', authentication, todoListContollers.getTodoList);
router.get('/imp', authentication, todoListContollers.getImpList);
router.post('/', authentication, todoListContollers.addTodoList);
router.put('/:id', authentication, todoListContollers.updateTodoList);
router.put('/imp/:id', authentication, todoListContollers.togglePriority)
router.delete('/:id', authentication, todoListContollers.deleteTodoList);

module.exports = router;