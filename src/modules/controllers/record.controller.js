const Record = require('../../bd/models/records/index');

module.exports.getAllRecords = (req, res) => {
  Record.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.createRecord = (req, res) => {

  try {
    const record = new Record(req.body);
    const { body } = req;
    if (body) {
      record.save().then(() => {
        Record.find().then(result => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send('Error! Params not correct');
    };
  }
  catch (e) {
    res.status(400).send('Error adding new entry!');
  }

};