const { Schema } = require("mongoose");

const orderSchema = new Schema({
	//itemInfo에 주문 내에서 다수의 상품정보를 나타낼수도 있기 때문에 배열로 정의함
	//각 상품에 대한 세부 정보를 배열의 요소로 저장할 수 있다.
	//각 배열 요소는 한개의 상품 정보를 나타냄
	//item스키마에서 상품 이름, 가격 가져오기로해서 빼버림
// 	itemInfo: [{ 
// 		type: String,
// 		required: true,

// }],
//itemName이랑 intem이미지 url도 가져와야하네

	// itemName: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Item',
	// 	required: true
	// },
	// itemPrice:{
	// 	type: Schema.Types.Number,
	// 	ref: 'Item',
	// 	required: true
	// },
	// imgUrl:{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Item',
	// 	// required: true
	// }

	//여러개의 상품을 주문하기위해 배열로 담음
itemInfo:[{
	type: Schema.Types.ObjectId,
	ref: 'Item',
}],
	//여기다가 itemAmount를 넣을까 아님 지금 처럼 밖에다가 뺄까? 팀원분들이랑 상의 해보기 

	itemAmount:{
		type: Number,
		required: true,
},

// user스키마에서 가져오기로해서 빼버림
// 	buyer:{
// 		type: String,
// 		required: true,
// },
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
		type: Number
	}


});

module.exports = orderSchema;