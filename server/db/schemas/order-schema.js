const { Schema } = require("mongoose");

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
// orderEditTime ==> updatedAt으로 수정 feat. 코치님 코드리뷰
	createdAt: {
		type: Date,
		default: Date.now()
	},
	deletedAt: {
		type: Date,
		default: null
	},	

	updatedAt:{
		type: Date,
		default: Date.now()
},

//위 변경사항은 기존은 아래와 같았다
// , createdAt:{
// 	type: Date,
// 	default: Date.now()
// },
// deleteAt: {
// 	type: Date,
// 	default: null
// },orderEditTime: {
// 	type: Date,
// 	default: Date.now()
// }

});

module.exports = orderSchema;