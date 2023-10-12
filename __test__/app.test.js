const request = require("supertest");

const app = require("../src/app");

const path = require("path");

const imagePath = path.join(__dirname, `test_img.jpg`);

describe("app /", () => {
  it("responds with a 404 not found message", (done) => {
    request(app)
      .get("/notfounderror")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

describe("POST /", () => {
  it("responds with a success message and 201 status", (done) => {
    request(app)
      .post("/")
      .field("fname", "tony")
      .field("lname", "stark")
      .field("email", "tony@gmail.com")
      .field("mobile", 7896541230)
      .field("dob", "String")
      .field("year", 2000)
      .field("present_address", "String123456789")
      .field("perm_address", "String098765432")
      .field("place", "new york")
      .attach("photo", imagePath)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .expect({ message: "Student registered successfully" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 20000000);

  it("responds with a success message and 400 status without images", (done) => {
    request(app)
      .post("/")
      .field("fname", "tony")
      .field("lname", "stark")
      .field("email", "tony@gmail.com")
      .field("mobile", 7896541230)
      .field("dob", "String")
      .field("year", 2000)
      .field("present_address", "String123456789")
      .field("perm_address", "String098765432")
      .field("place", "new york")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({ error: "Image not found" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 20000000);

  it("responds with a success message and 400 status, Invalid email Input", (done) => {
    request(app)
      .post("/")
      .field("fname", "tony")
      .field("lname", "stark")
      .field("email", "tonygmailcom")
      .field("mobile", 7896541230)
      .field("dob", "String")
      .field("year", 2000)
      .field("present_address", "String123456789")
      .field("perm_address", "String098765432")
      .field("place", "new york")
      .attach("photo", imagePath)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({ error: "Invalid email address" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 20000000);

  it("responds with a success message and 400 status,Invalid mobile Input", (done) => {
    request(app)
      .post("/")
      .field("fname", "tony")
      .field("lname", "stark")
      .field("email", "tony@gmail.com")
      .field("mobile", 78965412301234567)
      .field("dob", "String")
      .field("year", 2000)
      .field("present_address", "String123456789")
      .field("perm_address", "String098765432")
      .field("place", "new york")
      .attach("photo", imagePath)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({ error: "Invalid mobile number" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 20000000);

  it("responds with a success message and 400 status, Invalid mobile Input", (done) => {
    request(app)
      .post("/")
      .field("fname", "tony")
      .field("lname", "stark")
      .field("email", "tony@gmail.com")
      .field("mobile", 78965412301234567)
      .field("dob", "String")
      .field("year", 2000)
      .field("present_address", "String123456789")
      .field("perm_address", "String098765432")
      .field("place", "new york")
      .attach("photo", imagePath)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({ error: "Invalid mobile number" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
}, 20000000);

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
