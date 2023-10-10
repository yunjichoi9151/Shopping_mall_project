// Schema 작성
const { Schema } = require("mongoose");

const userSchema = new Schema({
	// _id: ObjectId(),
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	joinTime: {
		// Date.now();
		type: Date,
		default: Date.now()
	},
	// default 값이 null, 만약 DELETE 요청을 했을 경우 Date.now() 입력
	deletedAt: {
		type: Date,
		default: null,
	}	
});

module.exports = userSchema;