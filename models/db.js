const mongoose = require('mongoose');
const { connect } = require('../server');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { 
    useNewUrlParser: true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');
module.exports = connect;