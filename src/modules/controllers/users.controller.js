const User = require('../../bd/models/users/index');
const Record = require('../../bd/models/records/index');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { secret } = require("../../../config")

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

module.exports.getAllUsers = (req, res) => {
  User.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.getAllRecords = (req, res) => {
  Record.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).send('User with this email exists !')
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new User({ email, password: hashPassword });

    user.save()
    const token = generateAccessToken(user._id)
    res.json({ token })
  } catch (e) {
    res.status(400).send('Registration error!');
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send(`User ${email} not found !`);
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(404).send(`Wrong password`);
    }

    const token = generateAccessToken(user._id)
    return res.json({ token })
  }
  catch (e) {
    res.status(400).send('Login error!');
  }
}