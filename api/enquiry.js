/* Vercel serverless entry. Delivery needs an env URL; see .env.example. */
const { enquiryHandler } = require('../lib/enquiry.cjs');

module.exports = function enquiry(req, res) {
  return enquiryHandler(req, res);
};
