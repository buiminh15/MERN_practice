var express = require('express');
var router = express.Router();
const pool = require('../db')
/* GET home page. */
router.post('/',async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *',[description])
    res.json(newTodo.rows[0])
  } catch (error) {
      console.error(error)
  }
});
router.get('/',async (req, res, next) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos)
  } catch (error) {
      console.error(error)
  }
});
router.get('/:id',async (req, res, next) => {
  try {
    const todo = await pool.query('SELECT * FROM todo where todo_id=$1',[req.params.id])
    res.json(todo.rows)
  } catch (error) {
      console.error(error)
  }
});
router.put('/:id',async (req, res, next) => {
  try {
    const updateTodo = await pool.query('UPDATE todo SET description =$1 where todo_id = $2',[req.body.description, req.params.id])
    res.json("Todo was updated")
  } catch (error) {
      console.error(error)
  }
});
router.delete('/:id',async (req, res, next) => {
  try {
    const deleteTodo = await pool.query('DELETE FROM todo where todo_id = $1',[req.params.id])
    res.json("Todo was deleted")
  } catch (error) {
      console.error(error)
  }
});


module.exports = router;