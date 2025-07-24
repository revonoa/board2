// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// 라우터
const postRouter = require('./routes/posts');
app.use('/', postRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행 중`);
});
