const jwt = require('jsonwebtoken');


/**
 *  verifyToken
 * 
 *    Verifies JWT from httpOnly.
 *    Attaches decoded user payload to req.user
 *    Returns 401 if token is missing or invalid.
 * 
 */
const verifyToken = function (req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (e) {
    return res.status(401).json({
      success: false,
      meessage: "Invalid or expired token."
    })
  }
}


/**
 *  requireAdmin
 * 
 *    Restricts access to users with admin role.
 *    Must be used  >> AFTER <<  verifyToken.
 */
const requireAdmin = function (req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden. Admin access only."
    });
  }

  next();
}


module.exports = { verifyToken, requireAdmin };