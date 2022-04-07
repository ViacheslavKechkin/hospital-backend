const Record = require('../../bd/models/records/index');
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET;

module.exports.createRecord = async (req, res) => {
  const { token } = req.headers;
  const { body } = req;

  if (!token) {
    res.status(404).send("Error");
  }

  const infoForUser = await jwt.verify(token, secret);
  if (body && infoForUser) {
    body.userId = infoForUser.id;
    const record = new Record(body);
    record.save().then(() => {
      Record.find({ userId: infoForUser.id },
        ["name", "doctor", "date", "comment"])
        .then(result => {
          res.send({ data: result });
        });
    }).catch((res) => {
      res.status(400).send('Error adding new entry!');
    });
  } else {
    res.status(422).send('Error! Params not correct');
  };
};

module.exports.getAllRecords = async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    res.status(404).send("Error");
  }

  try {
    const infoForUser = await jwt.verify(token, secret);
    if (infoForUser) {
      Record.find({ userId: infoForUser.id },
        ["name", "doctor", "date", "comment"])
        .then(result => {
          res.send({ data: result });
        })
        .catch((error) => {
          res.status(404).send("Error");
        });
    }
  } catch (error) {
    res.status(404).send("Error, you can't get all reception");
  }
};

module.exports.updateRecord = async (req, res) => {
  const body = req.body;
  const { token } = req.headers;
  try {
    const infoForUser = await jwt.verify(token, secret);
    if (infoForUser && body._id) {
      if (
        (body.hasOwnProperty("name")) ||
        body.hasOwnProperty("doctor") ||
        body.hasOwnProperty("date") ||
        body.hasOwnProperty("comment")
      ) {
        Record.updateOne({ _id: body._id }, body).then((result) => {
          Record.find({ userId: infoForUser.id },
            ["name", "doctor", "date", "comment"])
            .then((result) => {
              res.send({ data: result });
            })
            .catch((error) => {
              res.status(404).send("Error");
            })
        });
      } else {
        res.status(404).send("Error edit Reception");
      }
    }
  } catch (error) {
    res.status(404).send("Error edit");
  }
};

module.exports.deleteRecord = async (req, res) => {
  const id = req.query._id;
  const { token } = req.headers;
  try {
    const infoForUser = await jwt.verify(token, secret);
    if (infoForUser && id) {
      Record.deleteOne({ _id: id }).then((result) => {
        Record.find({ userId: infoForUser.id },
          ["name", "doctor", "date", "comment"])
          .then((result) => {
            res.send({ data: result });
          })
          .catch((error) => {
            res.status(404).send("Error function");
          })
      });
    } else {
      res.status(404).send("Error condition");
    }
  } catch (error) {
    res.status(404).send("Error data");
  }
};