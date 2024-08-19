const User = require('../models/User');

// Get User Profile
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { profilePicture, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profilePicture = profilePicture || user.profilePicture;
    user.bio = bio || user.bio;
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
