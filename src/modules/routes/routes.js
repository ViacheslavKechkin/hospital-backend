const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  login
} = require('../controllers/users.controller');

const {
  getAllRecords,
  createRecord
} = require('../controllers/record.controller');

router.get('/allUsers', getAllUsers);
router.post('/createUser', createUser);
router.post('/login', login);
router.get('/allRecords', getAllRecords);
router.post('/createRecord', createRecord);

module.exports = router;