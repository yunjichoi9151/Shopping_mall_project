const Schema = require("mongoose");

const commentSchema = new Schema({
	owner: [{
		type: Schema.Types.ObjectId, ref: “User”
	}],
	itemNumber: [{
		type: Schema.Types.ObjectId, ref: “Item”
	}],
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
});

module.exports = commentSchema;
