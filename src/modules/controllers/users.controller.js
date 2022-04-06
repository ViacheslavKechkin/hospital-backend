const User = require('../../bd/models/users/index');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET;

const generateAccessToken = (id, email) => {
  const payload = {
    id,
    email
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

module.exports.getAllUsers = (req, res) => {
  User.find().then(result => {
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
    const token = generateAccessToken(user._id, email)
    return res.json({ token, email, user })
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

    const token = generateAccessToken(user._id, email)
    return res.json({ token, user })
  }
  catch (e) {
    res.status(400).send('Login error!');
  }
}