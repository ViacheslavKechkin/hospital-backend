const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
} = require('../controllers/users.controller');

router.get('/allUsers', getAllUsers);
router.post('/createUser', createUser);

module.exports = router;