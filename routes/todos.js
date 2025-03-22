const { Router } = require('express');
const { createTodo, getAllTodos, updateTableRowById } = require('../models/Todo'); 

const router = Router();

// GET / - Получить все todos
router.get('/', async (req, res) => {
    const todos = await getAllTodos()
    res.render('index', {
      title: 'Todo list',
      isCreate: true,
      todos
    });
});

// GET /create - Отрисовать форму создания todo
router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true,
  });
});

router.post('/create', async (req,res) => {
  const todo = await createTodo(req.body.content)
  res.redirect('/')
})
router.post('/complete',async(req,res) =>{
  const todo = await updateTableRowById(req.body.id,!!req.body.completed)
  res.redirect('/')
})
module.exports = router //экспорт наружу