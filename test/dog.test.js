process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/User");
const Dog = require("../models/Dog");
const mockDogs = require("./mockDog");

const server = chai.use(chaiHttp);
const agent = server.request.agent(app);

// Set the mock username to use for the tests
const testUser = "UserA";

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
    await Dog.deleteMany();

    // Pre-register a list of users and dogs and associate them
    const users = await User.create(mockUsers);
    users.forEach(user => {
        let i = 0;
        mockDogs.forEach(dog => {
            if (dog.name.toLocaleLowerCase().includes(user.username)) {
                dog.reg_owner = user._id;
            } else {
                if (i < 5) dog.adopt_owner = user._id;
                i++;
            }
        });
    });
    await Dog.insertMany(mockDogs);

    // Setup agent for cookie retention for multiple tests
    const res = await agent.get("/user/login")
                            .send({ username: testUser, password: "12345678" });
    expect(res).to.have.cookie("jwt");
});

// Teardown for database
after(async () => {
    // await User.deleteMany();
    // await Dog.deleteMany();
    agent.close();
});

describe("Dog Tests", () => {
    describe("Registration Test",() => {
        describe("Registering a new dog", () => {
            it("Registering a dog with correct format", async () => {
                const res = await agent.post("/dog/register")
                            .send({
                                name: `newDog_${testUser}`,
                                description: "Testing registration in mocha/chai"
                            });
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("newDog");
                expect(res.body.newDog.name).to.be.equal(`newDog_${testUser}`);
            });

            it("Registering a dog with incorrect format, no name", async () => {
                const res = await agent.post("/dog/register")
                            .send({
                                name: "",
                                description: "Testing registration in mocha/chai"
                            });
                expect(res).to.have.status(404);
                expect(res).to.have.property("error");
            });
        });

        describe("Listing Registered Dog Tests", () => {
            it("List dogs of registered user with no pagination request", async () => {
                const res = await agent.get("/dog/register");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                // pagination is only going to return 5 dogs on p=0 or p=null
                expect(res.body.dogs).to.have.lengthOf(5);
            });
    
            it("List dogs of registered user with p=1", async () => {
                const res = await agent.get("/dog/register?p=1");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                // pagination is only going to return 2 dogs with p=1 (default 1 over flow + 1 new registered)
                expect(res.body.dogs).to.have.lengthOf(2);
            });
    
            it("Check dogs Listed is registered to auth user", async () => {
                const res = await agent.get("/dog/register?p=1");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
    
                const reg_owner = res.body.dogs[0].reg_owner;
                const user = await User.findById(reg_owner);
    
                expect(user.username).to.be.equal(testUser.toLowerCase());
            });
    
            it("List dogs with adoption filter set to true", async () => {
                const res = await agent.get("/dog/register?adopted=true");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                expect(res.body.dogs).to.have.lengthOf(5);
                res.body.dogs.forEach(dog => expect(dog).to.have.property("adopt_owner"));
            });
    
            it("List dogs with adoption filter set to false", async () => {
                const res = await agent.get("/dog/register?adopted=false");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                expect(res.body.dogs).to.have.lengthOf(2);
                res.body.dogs.forEach(dog => expect(dog).to.not.have.property("adopt_owner"));
            });
        });
    });

    describe("Dog adoption Test", () => {
        describe("Adopting a dog tests", () => {
            it("Adopting a dog with a valid ID", async () => {
                const thank_you_msg = "Testing adopting API in mocha";
                const dog = await Dog.findOne({ name: { $regex: "UserB" }, adopt_owner: { $exists: false}});
                const dogId = dog._id;

                const res = await agent.put(`/dog/adopt/${dogId}`)
                            .send({
                                thank_you_msg
                            });
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("updatedDog");
                expect(res.body.updatedDog).to.be.property("adopt_owner");
            });

            it("Adopting a dog with a invalid ID", async () => {
                const dogId = "18172293b9ea231cc7fd0326";
                const thank_you_msg = "Testing adopting API in mocha";

                const res = await agent.put(`/dog/adopt/${dogId}`)
                            .send({
                                thank_you_msg
                            });
                expect(res).to.have.status(404);
                expect(res.body).to.have.property("error");
                expect(res.body.error.message).to.include("ID does not exist");
            });

            it("Restricting adoption by original owner", async () => {
                const thank_you_msg = "Testing adopting API in mocha";
                const dog = await Dog.findOne({ name: { $regex: testUser } });
                const dogId = dog._id;

                const res = await agent.put(`/dog/adopt/${dogId}`)
                            .send({
                                thank_you_msg
                            });
                expect(res).to.have.status(403);
                expect(res.body).to.have.property("error");
                expect(res.body.error.message).to.include("cannot adopt a dog you own");
            });

            it("Restricting adoption of alredy adopted dog", async () => {
                const thank_you_msg = "Testing adopting API in mocha";
                const dog = await Dog.findOne({ name: { $regex: "UserB" }, adopt_owner: { $exists: true }});
                const dogId = dog._id;

                const res = await agent.put(`/dog/adopt/${dogId}`)
                            .send({
                                thank_you_msg
                            });
                expect(res).to.have.status(403);
                expect(res.body).to.have.property("error");
                expect(res.body.error.message).to.include("this dog is already adopted");
            });
        });

        describe("Listing adopted dog tests", () => {
            it("List dogs of adopted user with no pagination request", async () => {
                const res = await agent.get("/dog/adopt");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                // pagination is only going to return 5 dogs on p=0 or p=null
                expect(res.body.dogs).to.have.lengthOf(5);
            });
    
            it("List dogs of adopted user with p=1", async () => {
                const res = await agent.get("/dog/adopt?p=1");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
                // pagination is only going to return 1 on pagination p = 1 (1 newly adopted)
                expect(res.body.dogs).to.have.lengthOf(1);
            });
    
            it("Check dogs Listed is adopted to auth user", async () => {
                const res = await agent.get("/dog/adopt?p=1");
                expect(res).to.have.status(200);
                expect(res.body).to.have.key("dogs");
    
                const adopt_owner = res.body.dogs[0].adopt_owner;
                const user = await User.findById(adopt_owner);
    
                expect(user.username).to.be.equal(testUser.toLowerCase());
            });
        });
    });

    describe("Remove Dog Test", () => {
        it("Valid removal valid ID", async () => {
            const dog = await Dog.findOne({ adopt_owner: { $exists: false }});
            const res = await agent.delete(`/dog/remove/${dog._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("dogRemoved");
        });

        it("Restrict removal with invalid ID", async () => {
            const dogId = "18172293b9ea231cc7fd0326";
            const res = await agent.delete(`/dog/remove/${dogId}`);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property("error");
            expect(res.body.error.message).to.include("dog ID does not exist");
        });

        it("Restrict removal for a dog registered to the a different owner", async () => {
            const dog = await Dog.findOne({ name: { $regex: "UserB"}, adopt_owner: { $exists: false }});
            const res = await agent.delete(`/dog/remove/${dog._id}`);
            expect(res).to.have.status(401);
            expect(res.body).to.have.property("error");
            expect(res.body.error.message).to.include("cannot remove a dog not registered to you");
        });

        it("Restrict removal for a dog that's already adopted", async () => {
            const dog = await Dog.findOne({ name: { $regex: "UserB" }, adopt_owner: { $exists: true }});
            const res = await agent.delete(`/dog/remove/${dog._id}`);
            expect(res).to.have.status(401);
            expect(res.body).to.have.property("error");
            expect(res.body.error.message).to.include("cannot remove an adopted dog");
        });
    });
});