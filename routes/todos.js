const { Router } = require('express');
const { createTodo, getAllTodos } = require('../models/Todo'); 

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
  const todo = createTodo({
    content: req.body.title
  })
  await todo.save()
  res.redirect('/')
})

module.exports = router //экспорт наружу