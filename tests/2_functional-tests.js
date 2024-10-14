const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("convert a valid input such as 10L", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnUnit, 'gal')
        assert.equal(res.body.returnNum, 2.64172)
        done();
      });
  });
  test("convert an invalid input such as 32g", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit')
        done();
      });
  });
  test("convert an invalid number such as 3/7.2/4kg", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number')
        done();
      });
  });
  test("convert an invalid number AND unit such as 3/7.2/4kilomegagram", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit')
        done();
      });
  });
  test("convert with no number such as kg", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnUnit, 'lbs')
        assert.equal(res.body.returnNum, 2.20462)
        done();
      });
  });
});
