const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  login
} = require('../controllers/users.controller');

router.get('/allUsers', getAllUsers);
router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;