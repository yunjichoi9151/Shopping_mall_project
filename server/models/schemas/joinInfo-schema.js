// Schema 작성
import Schema from "mongoose";

const joinInfoSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
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
	
})

model.exports = joinInfoSchema;
