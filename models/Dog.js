const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// declare the dog schema
const dogSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for your dog"],
    },
    description: {
        type: String,
        required: false,
    },
    reg_owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Each dog must have a registered owner"]
    },
    adopt_owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    thank_you_msg: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Dog = mongoose.model("dog", dogSchema);

module.exports = Dog;