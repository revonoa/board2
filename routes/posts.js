const express = require('express');
const router = express.Router();
const conn = require('../db');  // ← 여기 변경됨

// 랜덤 닉네임 생성 함수
function generateNickname() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nickname = '';
  for (let i = 0; i < 8; i++) {
    nickname += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nickname;
}

// 홈 → 기본은 자유게시판
router.get('/', (req, res) => {
  res.redirect('/category/자유게시판');
});

// 카테고리별 게시글 목록
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const sql = 'SELECT * FROM posts WHERE category = ? ORDER BY id DESC';
  conn.query(sql, [category], (err, rows) => {
    if (err) return res.send('DB 오류');
    res.render('index', { posts: rows, currentCategory: category });
  });
});

// 글쓰기 페이지
router.get('/write/:category', (req, res) => {
  const category = req.params.category;
  res.render('write', { category });
});

// 글 업로드
router.post('/write/:category', (req, res) => {
  const { content } = req.body;
  const category = req.params.category;
  const nickname = generateNickname();

  const sql = 'INSERT INTO posts (nickname, category, content) VALUES (?, ?, ?)';
  conn.query(sql, [nickname, category, content], (err) => {
    if (err) return res.send('DB 삽입 오류');
    res.redirect(`/category/${category}`);
  });
});


module.exports = router;
