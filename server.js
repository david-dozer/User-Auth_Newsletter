const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db-config');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/news', (req, res) => {
  let sql = 'SELECT * FROM news_articles ORDER BY date DESC LIMIT 5';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/news', (req, res) => {
  let news = { title: req.body.title, content: req.body.content, date: req.body.date };
  let sql = 'INSERT INTO news_articles SET ?';
  db.query(sql, news, (err) => {
    if (err) throw err;
    res.send('News added');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
