const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getAllRecords,
  createUser,
  login
} = require('../controllers/users.controller');

router.get('/allUsers', getAllUsers);
router.get('/allRecords', getAllRecords);
router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;