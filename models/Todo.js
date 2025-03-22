const mysql = require('mysql2/promise');
const pool = require('../db')
async function createTodo(content) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO todos (content) VALUES (?)',
      [content]
    );
    console.log('SQL Query:', 'INSERT INTO todos (content) VALUES (?)');
    console.log('Values:', [content]);
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