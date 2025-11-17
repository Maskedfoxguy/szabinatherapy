// Page controller: exposes CRUD helpers for marketing page content.
const Page = require('../models/Page');

exports.getPublishedPages = async (req, res, next) => {
  try {
    const pages = await Page.find({ published: true });
    res.json(pages);
  } catch (error) {
    next(error);
  }
};

exports.savePage = async (req, res) => {
  res.json({ message: 'Page editing endpoint stub – wire up admin editing later.' });
};
