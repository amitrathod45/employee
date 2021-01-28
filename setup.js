const { port } = require("./config");
const employeeController = require('../controllers/employeeController');
const employeeModel = require('../models/employee.model');
const handleError = require('../error');


module.exports = {
  server(app) {
    app.listen(port, () => console.log(`App is listening on port ${port}`));
  },
  setRoutes(app, db) {
    const empModel = employeeModel(db);
    app.use(employeeController(empModel));
    app.use(handleError);
    return {
      empCollection: employeeModel.collection,
    }
  },
};
