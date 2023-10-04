const Schema = require("mongoose");

const userSchema = new Schema({
    // objectID 사용
    // _id: ObjectId(),
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
});

module.exports = userSchema;