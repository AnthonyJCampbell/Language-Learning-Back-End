const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'This is the default secret...';

module.exports = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options)
}