const express = require('express');
const router = express.Router();

const {
  getAllRecords,
  createRecord,
  updateRecord
} = require('../controllers/record.controller');

router.get('/allRecords', getAllRecords);
router.post('/createRecord', createRecord);
router.patch('/editOneRecord', updateRecord);

module.exports = router;