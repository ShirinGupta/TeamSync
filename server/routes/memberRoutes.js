const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Images will be saved in server/uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/members
// @desc    Add a new member
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, contact } = req.body;
    let imagePath = '';

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newMember = new Member({
      name,
      role,
      email,
      contact,
      image: imagePath || 'default.jpg',
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/members
// @desc    Get all members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/members/:id
// @desc    Get single member by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/members/:id
// @desc    Update a member
// @access  Public
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let updateData = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      contact: req.body.contact,
    };

    // If a new image is uploaded, update the image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/members/:id
// @desc    Delete a member
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member deleted successfully', member: deletedMember });
  } catch (error) {
    console.error('Error deleting member:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/members/stats/summary
// @desc    Get statistics about members
// @access  Public
router.get('/stats/summary', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const roleStats = await Member.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      totalMembers,
      roleStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
