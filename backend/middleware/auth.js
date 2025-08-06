import jwt from 'jsonwebtoken';

/**
 * @description A middleware function that verifies the user is logged in with a valid jwt token
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
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

export default checkToken;
