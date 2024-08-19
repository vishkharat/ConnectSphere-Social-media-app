// controllers/messageController.js
const Message = require('../models/Message');

// Send Message
exports.sendMessage = async (req, res) => {
  const { receiverId } = req.body;  // receiverId should be in the body, not params
  const senderId = req.user._id;    // Ensure you are using req.user._id
  const { content } = req.body;

  try {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error); // Log the complete error
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get Messages
// controllers/messageController.js
exports.getMessages = async (req, res) => {
    const userId = req.user._id;
    const { receiverId } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ]
      }).populate('sender', 'username').populate('receiver', 'username');
  
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to get messages' });
    }
  };
  