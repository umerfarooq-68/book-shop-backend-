const User = require('../models/User');
const Title = require('../models/Title');
const bcrypt = require('bcrypt');
// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};
// Controller for user login
exports.loginUser = (req, res) => {
  // Passport.js's authenticate middleware handles authentication
  res.status(200).json({ message: 'Login successful', user: req.user });
};
// Controller for uploading titles
exports.uploadTitle = async (req, res) => {
  try {
    // Assuming the title data is sent in the request body
    const { titleName, description, author } = req.body;
    // Create the title in the database
    const newTitle = await Title.create({
      titleName,
      description,
      author,
    });
    res.status(201).json({ message: 'Title uploaded successfully', title: newTitle });
  } catch (error) {
    console.error('Error uploading title:', error);
    res.status(500).json({ error: 'Failed to upload title' });
  }
};
exports.getAllTitles = async (req, res) => {
  try {
    const titles = await Title.findAll();
    res.status(200).json(titles);
  } catch (error) {
    console.error('Error fetching titles:', error);
    res.status(500).json({ error: 'Failed to fetch titles' });
  }
};
// deleting users 
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const rowsDeleted = await User.destroy({ where: { id: userId } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// deleting specific field 
exports.deleteFieldsById = async (req, res) => {
  const {id} = req.params;
  const {field} = req.body;
   try {
    const book = await Title.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log('Book before modification:', book.toJSON());
    if (field) {
      // Deleting a specific field
      if (!['titleName', 'description', 'author'].includes(field)) {
        return res.status(400).json({ message: 'Invalid field' });
      }
      book[field] = null;
    } else {
      // Deleting all fields
      book.titleName = null;
      book.description = null;
      book.author = null;
    }
    console.log('Book after modification:', book.toJSON());
    // Set validate: false to bypass validation
    await book.save({ validate: false });
    const updatedBook = await Title.findByPk(id);
    console.log('Book after saving:', updatedBook.toJSON());
    return res.status(200).json({
      message: field ? `${field} deleted successfully` : 'All fields deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting fields:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
