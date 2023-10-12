const { Schema } = require("mongoose");
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 4942ac3 (🔔 Merge Request: Resolving conflict)
=======
<<<<<<< HEAD
=======
=======
>>>>>>> 4942ac3 (🔔 Merge Request: Resolving conflict)

>>>>>>> feature/user
>>>>>>> feature/user
const categorySchema = new Schema({

	name: {
		type: String,
		required: true,
	},
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
});

module.exports = categorySchema;

/*
const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	detailCategory: [
		type: String,
	],
});

const detailSchema = new Schema({
	name: {
		type: String,
	},
	itmes: [{
		type: Schema.Types.ObjectId, ref: 'Item'
	}],
})
// 애초에 등록을 할때, 큰 카테고리를 선택하는게 아니고, 세부 카테고리를 선택해서 만들어지면? 그 세부 카테고리를 자연스럽게 큰 카테고리에 포함시켜준다.
const proteinSchema = new Schema({
	itmes: [{
		type: Schema.Types.ObjectId, ref: 'Item'
	}]
});

const carboSchema = new Schema({
	itmes: [{
		type: Schema.Types.ObjectId, ref: 'Item'
	}],
});

const aminoSchema = new Schema({
	itmes: [{
		type: Schema.Types.ObjectId, ref: 'Item'
	}],
});

*/