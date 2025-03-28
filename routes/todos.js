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
  await createTodo(req.body.content)
  res.redirect('/')
})
router.post('/complete',async(req,res) =>{
  const status = req.body.completed === "true" ? 1 : 0;
  let ID = req.body.id;
  console.log("Получен POST запрос /complete:", "ID:", ID, "Status:", status);
  await updateTableRowById(ID,status);
})
module.exports = router //экспорт наружу