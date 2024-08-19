const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Create Post
exports.createPost = async (req, res) => {
    const { content } = req.body;
  
    try {
      const newPost = new Post({
        user: req.user._id, // Use req.user._id to ensure the user field is set
        content
      });
      await newPost.save();
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Post creation error:', error.message); // Log the specific error
      res.status(500).json({ error: 'Failed to create post' });
    }
  };
  
// Like Post
exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { id: userId } = req.user; // Extract userId from req.user (from auth middleware)
    const { content } = req.body;
  
    try {
      if (!userId) {
        return res.status(400).json({ error: 'User ID is missing' });
      }
  
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }
  
      const newComment = new Comment({ post: postId, user: userId, content });
      console.log('Saving comment:', newComment); // Log the comment to be saved
      await newComment.save();
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.comments.push(newComment._id);
      await post.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  };

  exports.getPostWithComments = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId)
        .populate({
          path: 'comments',
          populate: { path: 'user', select: 'username' }  // Populate the 'user' field within each comment
        })
        .populate('comments');  // Populate the actual comment content
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      console.error('Error fetching post with comments:', error.message);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  };