const mysql = require('mysql2/promise');
const pool = require('../index')
async function createTodo(content) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO todos (content) VALUES (50)',
      [content]
    );
    return { id: result.insertId, content: content, status: false }; 
  } catch (error) {
    console.error('Ошибка при создании todo:', error);
    throw error; 
  }
}

async function getAllTodos() {
    try {
      const [rows] = await pool.execute('SELECT * FROM todos');
      return rows;
    } catch (error) {
      console.error('Ошибка при получении всех todos:', error);
      throw error;
    }
  }

  module.exports = {
    createTodo,
    getAllTodos,
  };