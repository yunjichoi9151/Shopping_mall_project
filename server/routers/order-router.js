const express = require("express")
const {
	Router
} = require('express')
const Order = require("../db/models/order-model")

const orderRouter = Router()

//주문 생성
orderRouter.post('/', async (req, res) => {
	const {
		itemInfo,
		itemAmount,
		buyer,
		createdAt
	} = req.body;
	const order = await Order.create({
		itemInfo,
		itemAmount,
		buyer,
		createdAt
	})
	res.json(order);
})

//주문 조회
orderRouter.get('/', async (req, res) => {
	const orders = await Order.find({});
	res.json(orders)
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
		buyer
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

		res.json(order)
	} catch (err) {
		res.json({
			message: err.message
		})
	}
})


module.exports = orderRouter;