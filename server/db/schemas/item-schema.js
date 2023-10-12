const { Schema } = require("mongoose");
const { Types: { ObjectId } } = Schema;
// const ItemImageModel = require("../models/itemImage-model");

// item을 array에 저장하기 위해 변경
const itemSchema = new Schema([{
	name: {
		type: String,
		required: true,
	},
	category: {
		type: ObjectId,
		required: true,
		ref: 'Category',
	},
	price: {
		type: Number,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},/*
	comments: [{
		type: Schema.Types.ObjectId, ref: 'Comment'
	}],*/
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: null
	},
	deletedAt: {
		type: Date,
		default: null
	},
}]);

module.exports = itemSchema;