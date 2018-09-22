const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  _id: Number,
  company: String,
  companyAbbr: String,
  percentage: Number,
  group: Number,
  currentDay: Array,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;

//relatedCompanies: [{_id:1}, {_id:2}, {_id:3}, {_id:4},{_id:5},{_id:6}, {_id:7}, {_id:8}, {_id:9}, 7, 8, 9, 10, 11, 12]