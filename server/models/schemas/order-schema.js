import Schema from "mongoose";

const orderSchema = new Schema({
	itemInfo: [{ 
		type: String,
		required: true,

}],
	itemAmount:{
		type: Number,
		required: true,
},
	buyer:{
		type: String,
		required: true,
},
// 구매시간
	createdAt:{
		type: Date,
		default: Date.now()
},
	deletedAt: {
		type: Date,
		default: null
},
	orderEditTime: {
		type: Date,
		default: null
},
});

model.exports = orderSchema;