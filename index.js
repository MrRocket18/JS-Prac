const express = require('express');
const mysql = require('mysql2/promise');
const session = require('express-session')
const exphbs = require('express-handlebars')
const MySQLStore = require('express-mysql-session')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

let sets = {
    host: 'platon.teyhd.ru',
    user: 'student',
    password: 'studpass',
    database: 'prutskov_todo',
    port: '3407',
    charset: 'utf8mb4_general_ci',
  };
const app = express();
const pool = mysql.createPool(sets);

module.exports = pool;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.urlencoded({extended: true}))

app.use(todoRoutes)

async function start() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await pool.execute('SELECT * FROM todos');
        console.log('Успешное подключение к БД');
        console.log(rows);
        connection.release();
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.error('Ошибка подключения к БД:', e)
    }
    
}

start()

