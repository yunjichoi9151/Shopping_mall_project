const express = require("express");
const { Router } = require('express');
// const { categoryService } = require("../services");
const CategoryModel = require("../db/models/category-model");

const categoryRouter = Router();
// 카테고리 생성
categoryRouter.post("/", async (req, res, next) => {
    console.log("카테고리 생성");
    const { curRole } = req;
    if(curRole !== "admin") {
        throw new Error("관리자 권한이 없습니다.");
    }
    const { name } = req.body;
    if(!name || name === "") {
        // 다른 res.json도 status를 포함하게 바꿔야하는지 팀원들과 상의 예정
        return res.status(400).json({
            status: 400,
            msg: "카테고리 이름을 입력해주세요.",
        })
    }
    try {
        const { name, items } = req.params;
        const newCategory = await CategoryModel.create({
            name,
            items,
        });
        res.json(newCategory);
    } catch(err) {
        next(err);
    }
})

// 모든 카테고리 조희
// 메인 페이지에서 보여지도록
categoryRouter.get("/", async (req, res, next) => {
    console.log("모든 카테고리 조회");
    try {
        const categories = await CategoryModel.find({});
        return res.status(200).json({
            status: 200,
            msg: "카테고리 조회",
            data: categories,
        });
    } catch(err) {
        next(err);
    }
});

// 하나의 카테고리만 조회
categoryRouter.get("/:categoryId", async (req, res, next) => {
    console.log("하나의 카테고리만 조회");
    try {
        const { categoryId } = req.params;
        const category = await CategoryModel.findOne({ _id: categoryId});
        res.json(category);
    } catch(err) {
        next(err);
    }

})

// 카테고리 수정
categoryRouter.put("/:categoryId", async (req, res, next) => {
    console.log("카테고리 수정");
    const { curRole } = req;
    if(curRole !== "admin") {
        throw new Error("관리자 권한이 없습니다.");
    }
    try {
        const { categoryId } = req.params;
        const { name, items } = req.body;
        const category = await CategoryModel.updateOne(
            {
                _id: categoryId
            },
            {
                name,
                items,
            }
        );
        res.json(category);
    } catch(err) {
        next(err);
    }
})

// 카테고리 삭제
categoryRouter.delete("/:categoryId", async (req, res, next) => {
    console.log("카테고리 삭제");
    const { curRole } = req;
    if(curRole !== "admin") {
        throw new Error("관리자 권한이 없습니다.");
    }
    try {
        const { categoryId } = req.params;
        const deleteCategory = await CategoryModel.deleteOne({ _id: categoryId });
        // deleteAt을 추가할 예정
        res.json(deleteCategory);
    } catch(err) {
        next(err);
    }
})

module.exports = categoryRouter;