import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    const error = new Error(`Access Denied.`);
    error.status = 401;
    return next(error);
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.secretKey);
    req.user = verified;
    next();
  } catch (error) {
    error = new Error(`Access Denied.`);
    error.status = 400;
    return next(error);
  }
};
