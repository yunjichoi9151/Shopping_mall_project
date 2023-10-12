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

	// let orderCount = 0; // 이거 아닌거 같음 왜냐면 베스트아이템 을 메인페이지에 넣는데 이렇게하면 
	//주문할 때마다 그냥 계속 카운트됨
try{

	const {
		itemInfo,
		itemAmount,
		totalPrice,
		createdAt
	} = req.body;

	const { userId } = req.body

	//유저 정보를 포함하여 주문을 생성한다. 
	const user = await User.findById({ _id: userId}); //userId는 사용자의 id이다

	if(!user) {
		return res.status(404).json({message:'User not found'});
	}

	const order = await Order.create({
		itemInfo,
		itemAmount,
		totalPrice,
		createdAt,
		user: user._id 
		//user._id는 User모델의 objectId이다 --> 주문의 user필드에 주문을 한 유저의 objectid가 저장됨
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
		const orders = await Order.find({})
			.populate('itemInfo','name price')
			.populate('user', 'name email phoneNumber')
			// .populate('itemName')
			// .populate('itemPrice')
			// .populate({ path: 'itemInfo.itemName', select: 'name'}) //path는 어떤 필드를 가져올지 나타냄
			// .populate({ path: 'itemInfo.itemPrice', select: 'price'})
			// .populate({ path: 'itemInfo.imgUrl', select: 'imgUrl'});

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
	const orders = await Order.findById(orderId)
			.populate('itemInfo','name price')
			.populate('user', 'name email phoneNumber address')
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
		totalPrice,
		status
	} = req.body; // updatedAt빼버림

	const currentTime = Date.now();

	const order = await Order.updateOne({
		_id: orderId
	}, {
		itemInfo,
		itemAmount,
		status,
		totalPrice,

		
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

//목 15: 50
// orderRouter.put('/delete/:orderId', async (req, res) => {
// 	try {
// 		const {
// 			orderId
// 		} = req.params

// 		const currentTime = Date.now()
// 		const order = await Order.updateOne({
// 				_id: orderId
// 			}, {
// 				deletedAt: currentTime
// 			}

// 		)
// 		if(!order){
// 			res.status(404).json({message: 'order not found'})
// 		}

// 		res.json(order)
// 	} catch (err) {
// 		res.json({
// 			message: err.message
// 		})
// 	}
// })
// 주문 수정 (특정 상품 삭제)
orderRouter.put('/delete/:orderId', async (req, res) => {
	try {
	  const { orderId } = req.params;
	  const currentTime = Date.now()
  
	  // 주문 조회
	  const order = await Order.updateOne({ _id: orderId}, { deletedAt: currentTime});
  
	  if (!order) {
		res.status(404).json({ message: '주문을 찾을 수 없음' });
		return;
	  }
  
	  res.json(order);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  });
  



module.exports = orderRouter;