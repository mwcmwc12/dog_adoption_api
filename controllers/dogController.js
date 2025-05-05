const ExpressError = require("../errors/expressError");
const Dog = require("../models/Dog");

// pagination constants
const MAXPERRTN = 5;

// Callback function to register a new dog
async function registerDog(req, res) {
    try {
        const { name, description } = req.body;
        const user = res.locals.user;
        const dog = await Dog.create({
            name,
            description,
            reg_owner: user._id,
        });
        res.status(201).json({ 
            newDog: {
                name: dog.name,
                description: dog.description,
                owner: dog.reg_owner,
                createdAt: dog.createdAt,
                updatedAt: dog.updatedAt,
            }
        });
    } catch (err) {
        console.log(err)
        let status = 500;
        if (Object.keys(err.errors).length === 1) {
            if (Object.keys(err.errors)[0] === "name") {
                status = 404;
            } else if (Object.keys(err.errors)[0] === "reg_owner") {
                status = 500;
            } else {
                status = 400;
            }
        throw new ExpressError(err.message, status);
    }
}}

// Callback to adopt a dog
async function adoptDog(req, res) {
    try {
        const dogId = req.params.id;
        const { thank_you_msg } = req.body;
        const user = res.locals.user;
        const dog = await Dog.findById(dogId);
        if (dog) {
            if (dog.reg_owner.equals(user._id)) {
                throw new ExpressError("You cannot adopt a dog you own", 403);
            } else if (dog.adopt_owner) {
                throw new ExpressError("Sorry, this dog is already adopted", 403);
            } else {
                await dog.updateOne({ adopt_owner: user._id, thank_you_msg });
                const upDog = await Dog.findById(dogId);
                res.status(200).json({ updatedDog: upDog });
            }
        } else {
            throw new ExpressError("Provided dog ID does not exist", 404);
        }
    } catch (err) {
        if (err instanceof ExpressError) {
            throw err
        }
        throw new ExpressError(err.message, 400);
    }
}

// Callback function to remove a dog
async function removeDog(req, res) {
    try {
        const dogId = req.params.id;
        const user = res.locals.user;
        const dog = await Dog.findById(dogId);
        if (dog) {
            if (dog.adopt_owner) {
                throw new ExpressError("You cannot remove an adopted dog", 401);
            } else if (dog.reg_owner.equals(user._id)) {
                const delRes = await dog.deleteOne();
                res.status(200).json({ dogRemoved: delRes });
            } else {
                throw new ExpressError("You cannot remove a dog not registered to you", 401);
            }
        } else {
            throw new ExpressError("Provided dog ID does not exist", 404);
        }
    } catch (err) {
        if (err instanceof ExpressError) {
            throw err
        }
        throw new ExpressError(err.message, 400);
    }
}

// Callback to list registered dogs
async function listRegDogs(req, res) {
    try {
        let query;
        // Check if the adopted query key exists and clean it
        const adopted = req.query.adopted?.toLowerCase().trim();
        const page = req.query.p || 0;
        const user = res.locals.user;

        // Build query based on the adopted filter option and add pagination
        if (adopted === "true") {
            query = { $and: [{
                    reg_owner: user._id,
                },
                {
                    adopt_owner: { $exists: true, $nin: [null] }
                }
            ] };
        } else if (adopted === "false") {
            query = { $and: [{
                reg_owner: user._id,
                adopt_owner: null
            }
        ] };
        } else {
            query = { reg_owner: user._id };
        }
        const dogs = await Dog.find(query)
            .sort({ name: 1 })
            .skip(page * MAXPERRTN)
            .limit(MAXPERRTN);
        res.status(200).json({ dogs });
    } catch (err) {
        throw new ExpressError(err.message, 500);
    }
}

// Callback to list adopted dogs
async function listAdoptedDogs(req, res) {
    try {
        const page = req.query.p || 0;
        const user = res.locals.user;

        const dogs = await Dog.find({ adopt_owner: user._id })
            .sort({ name: 1 })
            .skip(page * MAXPERRTN)
            .limit(MAXPERRTN);
        res.status(200).json({ dogs });
    } catch (err) {
        throw new ExpressError(err.message, 500);
    }
}

module.exports = {
    registerDog,
    adoptDog,
    removeDog,
    listRegDogs,
    listAdoptedDogs,
}