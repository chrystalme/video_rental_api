const admin = (req, res, next) => {
  if(!req.user.isAdmin) return res.status(403).send('Unauthorised Access. Access denied.');
  next();
}

module.exports = admin