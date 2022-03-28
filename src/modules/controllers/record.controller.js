const Record = require('../../bd/models/records/index');

module.exports.getAllRecords = (req, res) => {
  Record.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.createRecord = (req, res) => {

  const record = new Record(req.body);
  const { body } = req;
  if (body) {
    record.save().then(() => {
      Record.find().then(result => {
        res.send({ data: result });
      });
    }).catch((res) => {
      res.status(400).send('Error adding new entry!');
    });
  } else {
    res.status(422).send('Error! Params not correct');
  };
};