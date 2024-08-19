const express = require('express');
const { createPost, likePost, addComment, getPostWithComments  } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', (req, res) => {
    res.render('home');
  });
router.post('/', authMiddleware, createPost); // Apply auth middleware before createPost
router.post('/like/:postId', authMiddleware, likePost);
router.post('/comment/:postId', authMiddleware, addComment);
router.get('/:postId', authMiddleware, getPostWithComments);

module.exports = router;
