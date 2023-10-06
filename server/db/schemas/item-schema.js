const Schema = require("mongoose");
const { ItemImage } = require("../models/itemImage-model");

// item을 array에 저장하기 위해 변경
const itemSchema = new Schema([{
	name: {
		type: String,
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
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	comments: [{
		type: Schema.Types.ObjectId, ref: 'Comment'
	}],

}]);

module.exports = itemSchema;