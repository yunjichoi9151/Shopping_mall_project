const express = require("express");
const { Router } = require('express');
// const { ItemService } = require("../services");
const ItemModel = require("../db/models/item-model");

const itemRouter = Router();
// 상품 생성
itemRouter.post("/", async (req, res, next) => {
    console.log("상품 생성");
    // request/response 확인을 위해 주석처리
    /*const { curRole } = req;
    if(curRole !== "admin") {
        throw new Error("관리자 권한이 없습니다.");
    }*/
    /*const { name } = req.body;
    if(!name || name === "") {
        // 다른 res.json도 status를 포함하게 바꿔야하는지 팀원들과 상의 예정
        return res.status(400).json({
            status: 400,
            msg: "상품 이름을 입력해주세요.",
        })
    }*/
    try {
        const { name, category, price } = req.body;
        const newItem = await ItemModel.create({
            name, 
            category, 
            price, /*
            itemDetail, // 상품 url schema를 따로 생성하여 url 주소값을 배열로 저장할 예정
            imgUrl,*/
        });
        res.json(newItem);
    } catch(err) {
        next(err);
    }
})

// 모든 상품 조희
// 메인 페이지
itemRouter.get("/", async (req, res, next) => {
    console.log("모든 상품 조회");
    try {
        const items = await ItemModel.find({}).sort({price: 1}).limit(1);
        return res.status(200).json({
            status: 200,
            msg: "상품 조회",
            data: items,
        });
    } catch(err) {
        next(err);
    }
});

// 카테고리 별 상품 조회
// 카테고리 페이지
itemRouter.get("/:itemId", async (req, res, next) => {
    console.log("카테고리 별 상품 조회");
    try {
        const { itemId } = req.params;
        const { category } = req.body;
        const item = await ItemModel.findOnd(
            { _id: itemId },
            { category: category },
        )
    } catch(err) {
        next(err);
    }
})

// 하나의 상품만 조회
// 상품 상세 페이지
itemRouter.get("/:itemId", async (req, res, next) => {
    console.log("하나의 상품만 조회");
    try {
        const { itemId } = req.params;
        const item = await ItemModel.findOne({ _id: itemId});
        res.json(item);
    } catch(err) {
        next(err);
    }

})

// 상품 수정
itemRouter.put("/:itemId", async (req, res, next) => {
    console.log("상품 수정");
    // request/response 확인을 위해 주석처리
    // const { curRole } = req;
    // if(curRole !== "admin") {
    //     throw new Error("관리자 권한이 없습니다.");
    // }
    try {
        const { itemId } = req.params;
        const { name, category, price } = req.body;
        const currentTime = Date.now();
        const item = await ItemModel.updateOne(
            {
                _id: itemId
            },
            {
                name, 
                category, 
                price, 
                // itemDetail, 
                // imgUrl,
                updatedAt: currentTime,
            }
        );
        res.json(item);
    } catch(err) {
        next(err);
    }
})

// 상품 삭제
/*
itemRouter.delete("/:itemId", async (req, res, next) => {
    console.log("상품 삭제");
    // request/response 확인을 위해 주석처리
    // const { curRole } = req;
    // if(curRole !== "admin") {
    //     throw new Error("관리자 권한이 없습니다.");
    // }
    try {
        const { itemId } = req.params;
        const deleteItem = await ItemModel.deleteOne({ _id: itemId });
        res.json(deleteItem);
    } catch(err) {
        next(err);
    }
})
*/

itemRouter.put("/:itemId", async (req, res, next) => {
    console.log("상품 삭제");
    try {
        const { itemId } = req.params;
        const currentTime = Date.now();
        const deletedItem = await ItemModel.updateOne(
            {
                _id: itemId,
            },
            {
                deletedAt: currentTime,
            },
        )
        res.json(deletedItem);
    } catch(err) {
        next(err);
    }
})

module.exports = itemRouter;