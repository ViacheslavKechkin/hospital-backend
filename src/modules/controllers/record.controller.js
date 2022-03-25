const Record = require('../../bd/models/records/index');

module.exports.getAllRecords = (req, res) => {
  Record.find().then(result => {
    res.send({ data: result });
  });
};