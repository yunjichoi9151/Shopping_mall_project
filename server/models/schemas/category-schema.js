import Schema from "mongoose";

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
	items: [{
		type: Schema.Types.ObjectId, ref: “Item”
	}],
});

model.exports = categorySchema;