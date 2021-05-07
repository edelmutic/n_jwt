const Router = require('express');
const controller = require('./authController');
const router = new Router();
const { check } = require('express-validator');

router.post(
  '/registration',
  [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password shoud be more than 4 symbols').isLength({
      min: 4,
    }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
