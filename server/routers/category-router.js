const express = require("express");
const router = express();
const { Category, Item } = require("../db");

// 카테고리 조희
router.get("/", async (req, res, next) => {
    console.log("카테고리 조회");
    try {
        const categories = await Category.find({});
    } catch(err) {
        next(err);
    }
});