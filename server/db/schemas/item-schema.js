const Schema = require("mongoose");

const itemSchema = new Schema({
	name: {
		type:String,
		required: true,
	},
	category: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	itemDetail: {
		type: ,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	comments: [{
		type: Schema.Types.ObjectId, ref: “Comment”
	}],
});

module.exports = itemSchema;