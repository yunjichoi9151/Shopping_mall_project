const express = require("express")
const {
	Router
} = require('express')
const Order = require("../db/models/order-model")
const User = require("../db/models/user-model")
const Item = require("../db/models/item-model")

const orderRouter = Router()

//주문 생성
orderRouter.post('/', async (req, res) => {

try{

	const {
		itemInfo,
		itemAmount,
		totalPrice,
		createdAt
	} = req.body;

	//유저 정보를 포함하여 주문을 생성한다. 
	const user = await User.findById(req.body.userId); //userId는 사용자의 id이다

	const order = await Order.create({
		itemInfo,
		itemAmount,
		totalPrice,
		createdAt,
		user: user._id //user._id는 User모델의 objectId이다 --> 주문의 user필드에 주문을 한 유저의 objectid가 저장됨
	})
	res.json(order);
	}catch(err) {
		res.status(500).json({message: err.message});
	}
})

//주문 조회
orderRouter.get('/', async (req, res) => {
	// const orders = await Order.find({}).sort(); --> 관리자order로 가서 확인하기
	try{
		//poplute('user')는 order스키마에 있는 user필드가 참조하고 있는 User모델의 정보를 Find함 
		//==쉽게 말하면 데이터 베이스 user필드에 저장된 유저id를 사용해 User모델을 불러와서 order에 있는 사용자 정보와 함께 결과를 줌
		//이를 통해 order
		const orders = await Order.find({}).populate('user').populate('itemInfo.itemName');
		res.json(orders)
		if(!orders){
			res.status(404).json({message: 'Order not found'});
		}
	}catch(err){

	}
})

//주문 상세 조회
orderRouter.get('/:orderId', async (req, res) => {
	const {
		orderId
	} = req.params;
	const order = await Order.findById(orderId);
	res.json(order)
})

//주문 수정 
orderRouter.put('/put/:orderId', async (req, res) => {
	const {
		orderId
	} = req.params;
	const {
		itemInfo,
		itemAmount,
		totalPrice
	} = req.body; // updatedAt빼버림

	const currentTime = Date.now();

	const order = await Order.updateOne({
		_id: orderId
	}, {
		itemInfo,
		itemAmount,
		buyer,
		updatedAt: currentTime
	}, {
		new: true
	})

	if (!order) {
		return res.status(404).json({
			message: '주문 못찾겠다'
		});
	}
	res.json(order)

})

//오류찾기위한 코드
// orderRouter.put('/:orderId', async (req, res) => {
// 	const {
// 		orderId
// 	} = req.params;
// 	const {
// 		itemInfo,
// 		itemAmount,
// 		buyer,
// 		updatedAt
// 	} = req.body;

// 	const order = await Order.findById(orderId);

// 	if (!order) {
// 		return res.status(404).json({
// 			message: '해당 주문을 찾을 수 없음'
// 		});
// 	}

// 	// 주문이 존재할 경우에만 업데이트를 시도합니다.
// 	const updatedOrder = await Order.updateOne({
// 		_id: orderId
// 	}, {
// 		itemInfo,
// 		itemAmount,
// 		buyer
// 	});

// 	res.json(updatedOrder);

// });


//주문 삭제 
// orderRouter.put('/:orderId', async (req, res) => {
// 	const {
// 		orderId
// 	} = req.params
// 	const order = await Order.deleteOne({
// 		_id: orderId
// 	})
// 	res.json(order)
// })
orderRouter.put('/delete/:orderId', async (req, res) => {
	try {
		const {
			orderId
		} = req.params

		const currentTime = Date.now()
		const order = await Order.updateOne({
				_id: orderId
			}, {
				deletedAt: currentTime
			}

		)
		if(!order){
			res.status(404).json({message: 'order not found'})
		}

		res.json(order)
	} catch (err) {
		res.json({
			message: err.message
		})
	}
})


module.exports = orderRouter;