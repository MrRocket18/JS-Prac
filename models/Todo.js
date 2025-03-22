const mysql = require('mysql2/promise');
const pool = require('../db')


async function createTodo(content) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO todos (content) VALUES (?)',
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
  async function updateTableRowById(id, newValue) {
    try {
      const sql = 'UPDATE todos SET status = ? WHERE id = ?';
      const [result] = await pool.execute(sql, [newValue, id]);
      
      if (result.affectedRows > 0) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
  

  module.exports = {
    createTodo,
    getAllTodos,
    updateTableRowById
  };