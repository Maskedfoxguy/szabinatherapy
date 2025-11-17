// Error middleware: formats thrown errors to keep API responses predictable.
module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
};
