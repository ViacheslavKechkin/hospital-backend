const User = require('../../bd/models/users/index');
const bcrypt = require('bcryptjs');

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
      return res.status(400).json({ massage: 'Пользователь с таким именем уже существует' })
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new User({ email, password: hashPassword });
    console.log(user);
    
    user.save().then(() => {
      User.find().then(result => {
        res.send({ data: result });
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).send('Registration error!');
  }
};