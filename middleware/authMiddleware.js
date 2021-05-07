module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'User is not authorized' });
  }
};
