const { Schema } = require("mongoose");

const orderSchema = new Schema({
	//itemInfo에 주문 내에서 다수의 상품정보를 나타낼수도 있기 때문에 배열로 정의함
	//각 상품에 대한 세부 정보를 배열의 요소로 저장할 수 있다.
	//각 배열 요소는 한개의 상품 정보를 나타냄
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

	//상품 주문 시간
	createdAt: {
		type: Date,
		default: Date.now()
	},
	//상품 취소 시간
	deletedAt: {
		type: Date,
		default: null
	},	
	//상품 주문 수정 시간
	updatedAt:{
		type: Date,
		default: null
},
//status를 추가해서 배송상태를 관리자페이지에서 수정할 수 있게 함
 	status:{
	type: String,
	enum: ["배송 준비 중", "배송 중", "배송 완료"],//데이터의 일관성을 유지하기 위해 3개로 못 박음
	default: "배송 준비 중"
 },
 //user모델에서 user값을 참조함(이메일, 번호, 주소등)
 	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	totalPrice: {
		type: String
	}


});

module.exports = orderSchema;