const { Router } = require("express");
const dogController = require("../controllers/dogController");

const dogRouter = Router();

// Get to "/dog/register" to list registered dogs
dogRouter.get("/register", dogController.listRegDogs);

// Post to "/dog/register" to register a new dog
dogRouter.post("/register", dogController.registerDog);

// Get to "/dog/adopt" to list adopted dogs
dogRouter.get("/adopt", dogController.listAdoptedDogs);

// Put to "/dog/adopt" to adopt an existing dog by id
dogRouter.put("/adopt/:id", dogController.adoptDog);

// Delete to "/dog/delete" to remove an existing dog by id
dogRouter.delete("/remove/:id", dogController.removeDog);

module.exports = dogRouter;