const express = require('express')
const { Router } = require('express')
const Order = require('../db/models/order-model');

const orderAdminRouter = Router();

function isAdmin(req, res, next) {
    const isAdminUser = true;  //우선 응답 데이터를 받아오기 위해 true로 설정해둠

    if(isAdminUser){
        next();
    }else{
        res.status(403).json({message:'관리자 권한이 필요합니다.'})
    }
}


//전체 주문 조회
orderAdminRouter.get('/', isAdmin, async(req, res) => {
    try{
        const orders = await Order.find({})
        res.json(orders)
    }catch(err){
        res.status(500).json({message:'Server Error'})
    }
})

//주문 배송 상태 수정
orderAdminRouter.put('/:orderId/status', isAdmin, async(req, res)=>{
    const { orderId } = req.params
    const { status } = req.body
    try{
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, {new: true})
        if(!updatedOrder){
            res.status(404).json({message: "can't find order"})
        }else{
            res.json(updatedOrder)
        }
    }catch(err){
        res.status(500).json({message: "server error"})
    }
})

//사용자들 주문 삭제 --> 이게 필요한가???
orderAdminRouter.delete("/:orderId", isAdmin, async(req, res)=>{
    const { orderId } = req.params;
    try{
        const deleteOrder = await Order.deleteOne({_id: orderId})
        if(!deleteOrder){
            res.status(404).json({ message: "Order not found"})
        }else{
            res.json(deleteOrder)
        }
    }catch(err){
        res.status(500).json({ message: "server error"})
    }
})


module.exports = orderAdminRouter