const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  login
} = require('../controllers/users.controller');

const {
  getAllRecords
} = require('../controllers/record.controller');

router.get('/allUsers', getAllUsers);
router.get('/allRecords', getAllRecords);
router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;