const Role = require('./models/Role');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
// const { json } = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAcessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'User already exist' });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'User was succesfully registrated' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Incorrect password` });
      }
      const token = generateAcessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async getUsers(req, res) {
    try {
      res.json('server working');
    } catch (error) {}
  }
}

module.exports = new authController();
