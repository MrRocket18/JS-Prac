const mysql = require('mysql2/promise');
const session = require('express-session')
const exphbs = require('express-handlebars')
const MySQLStore = require('express-mysql-session')

let sets = {
    host: 'platon.teyhd.ru',
    user: 'student',
    password: 'studpass',
    database: 'prutskov_todo',
    port: '3407',
    charset: 'utf8mb4_general_ci',
};

const pool = mysql.createPool(sets);

module.exports = pool;
async function start() {
    try {
        const connection = await pool.getConnection();
        console.log('Успешное подключение к БД');
    } catch (e) {
        console.error('Ошибка подключения к БД:', e)
    }
    
}

start()
