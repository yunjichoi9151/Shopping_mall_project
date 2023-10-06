const express = require("express")
const { Router } = require('express')
const Order = require("./db/models/order-model")

const orderRouter = Router()

//주문 생성
orderRouter.post('/', async(req, res) =>{
	const { itemInfo, itemAmount, buyer, createAt } = req.body;
	const order = await Order.create({
		itemInfo, itemAmount, buyer, createAt})
})

//주문 조회
orderRouter.get('/', async(req, res) =>{
	const orders = await Order.find({});
	res.json(orders)
})

//주문 상세 조회
orderRouter.get('/:orderId', async (req, res) =>{
	const { orderId } = req.params;
	const order = await Order.findById(orderId);
	res.json(order)
})

//주문 수정 
orderRouter.put('/:orderId', async(req, res)=>{
	const { orderId } = req.params;
	const { itemInfo, itemAmount, buyer, orderEditTime } = req.body;
	const order = await Order.updateOne(
		{_id:orderId}, {itemInfo, itemAmount, buyer, orderEditTime })
	res.json(order)
		
})

//주문 삭제 
orderRouter.delete('/:orderId', async(req, res) =>{
	const { orderId } = req.params
	const order = await Order.deleteOne({ _id: orderId})
	res.json(order)
})