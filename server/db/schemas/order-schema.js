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
//status를 추가해서 배송상태를 관리자페이지에서 수정할 수 있게 함
 status:{
	type: String,
	enum: ["배송 준비 중", "배송 중", "배송 완료"],//데이터의 일관성을 유지하기 위해 3개로 못 박음
	default: "배송 준비 중"
 }

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