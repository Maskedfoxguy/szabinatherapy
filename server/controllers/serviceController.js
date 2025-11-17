// Service controller: manages the therapy services catalog shown publicly.
const Service = require('../models/Service');

exports.listServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.saveService = async (req, res) => {
  res.json({ message: 'Service editing endpoint stub – implement CRUD soon.' });
};
