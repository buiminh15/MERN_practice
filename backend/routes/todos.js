var express = require('express');
var router = express.Router();
var pool = require('../db')
/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const allTodos = await pool.query("select * from todo;")
        res.json(allTodos.rows)
        // res.json({a: 'done'})
    } catch (error) {
        console.error(error.message);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await pool.query("select * from todo where todo_id=$1;", [req.params.id])
        res.json(todo.rows)
    } catch (error) {
        console.error(error.message);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query("insert into todo (description) values ($1);", [description])

        res.json(newTodo.rows)
    } catch (error) {
        console.error(error.message);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const { description } = req.body
        const { id } = req.params
        const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2;", [description, id])
        res.json("Todo was updated")
    } catch (error) {
        console.error(error.message);
    }
});
router.delete('/:id', async (req, res, next) => {
   try {
        const { id } = req.params
        const deleteTodo = await pool.query("delete from todo where todo_id = $1", [id])
        res.json("Todo was deleted")
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;