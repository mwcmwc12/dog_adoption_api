process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/User");
const Dog = require("../models/Dog");

const server = chai.use(chaiHttp);

const mockUsers = [
    {
        username: "UserA",
        password: "12345678"
    },
    {
        username: "UserB",
        password: "12345678"
    },
]
// Setup for database
before(async () => {
    await User.deleteMany();
    const users = await User.create(mockUsers);
});
// Teardown for database
after(async () => {
    await User.deleteMany();
});

describe("User Tests", () => {
    describe("User Login Tests", () => {
        it("Login an user", async () => {
            const res = await server.request(app)
                        .get("/user/login")
                        .send({ username: "UserA", password: "12345678" });
            expect(res).to.have.status(200);
            expect(res).to.have.cookie("jwt");
        });
    
        it("Reject incorrect login password", async() => {
            const res = await server.request(app)
                        .get("/user/login")
                        .send({ username: "UserA", password: "02345679" });
            expect(res).to.have.status(401);
            expect(res.body.error.message).to.equal("Incorrect password");
        });
    
        it("Reject incorrect login username", async() => {
            const res = await server.request(app)
                        .get("/user/login")
                        .send({ username: "UserC", password: "12345678" });
            expect(res).to.have.status(401);
            expect(res.body.error.message).to.equal("Incorrect username or user does not exist");
        });
    });
    
    describe("User Registration Tests", () => {
        it("Register and Login a new user", async () => {
            const res = await server.request(app)
                        .post("/user/register")
                        .send({ username: "UserC", password: "12345678" });
            expect(res).to.have.status(201);
            expect(res).to.have.cookie("jwt");
        });
    
        it("Registration password length too short", async () => {
            const res = await server.request(app)
            .post("/user/register")
            .send({ username: "UserC", password: "1234567" });
            expect(res).to.have.status(422);
            expect(res.body.error.message).to.contain("Minimum password length required");
        });
    });
});