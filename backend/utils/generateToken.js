import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

export default generateToken;
