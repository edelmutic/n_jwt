const Role = require('./models/Role');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'User already exist' });
      }
      const user = new User();
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {
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
