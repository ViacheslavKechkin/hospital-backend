const express = require('express');
const router = express.Router();

const {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/record.controller');

router.get('/allRecords', getAllRecords);
router.post('/createRecord', createRecord);
router.patch('/editOneRecord', updateRecord);
router.delete("/deleteOneRecord", deleteRecord);

module.exports = router;