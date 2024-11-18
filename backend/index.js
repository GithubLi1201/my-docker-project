const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// 设置数据库连接
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// API 路由
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO tasks (description) VALUES (?)', [task], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, task });
  });
});

app.listen(5000, () => {
  console.log('Backend server is running on port 5000');
});
