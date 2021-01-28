const request = require('supertest');
const app = require('../server');
const {ObjectID} = require('mongodb')
const employeeController = require('../controllers/employeeController');
const connect = require('../models/db');
const employeeModel = require('../models/employee.model');
const handleError = require('../error');


var empCollection;

beforeAll(async () => { 
    process.env.NODE_ENV = 'test'
    return connect((employee) =>{
        empCollection = employee
        app.use(employeeController(employeeModel(employee)));
        app.use(handleError);
    });
});

const emp1 = {
    _id: ObjectID(),
    name: 'emp 1'
}
const emp2 = {
    _id: ObjectID(),
    name: 'emp 2'
}
const emp3 = {
    _id: ObjectID(),
    name: 'emp 3',
    parent: emp1._id.toString()
}

const newEmp = {
    _id: ObjectID(),
    name: 'emp 4',
    parent: emp1._id.toString()
}


beforeEach(()=>{
    EmployeeDB(empCollection);

})

const EmployeeDB = (empCollection)=>{
empCollection.deleteMany();
empCollection.insertMany([emp1,emp2,emp3]);
};


const employeeTestCases = describe("CRUD employees", () => {
    it("should retrieve employees", async () => {
      const res = await request(app).get("/employee/list");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it("should delete employee", async () => {
      const res = await request(app).delete(`/employee/${emp1._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });
    it("should create employee", async () => {
      const res = await request(app).post(`/employee`).send(newEmp);
      expect(res.status).toBe(201);
      const res2 = await request(app).get(`/employee/${res.body}`);
      expect(res2.body.name).toEqual("emp 4");
    });
  });
  
  module.exports = employeeTestCases;
