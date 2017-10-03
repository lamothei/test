var mongoose = require('mongoose');

var JobPosting = new mongoose.Schema({
  postingId: String,
  title: String,
  blurb: String,
  languages: [String],
  frameworks: [String]
});

module.exports = JobPosting;