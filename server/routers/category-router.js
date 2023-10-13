const express = require("express");
const { Router } = require("express");
// const { userService } = require("../services/user-service");
const { CategoryModel } = require("../db/models/category-model");

const categoryRouter = Router();
// 카테고리 생성
categoryRouter.post("/", async (req, res, next) => {
  console.log("카테고리 생성");
  // request/response 확인을 위해 주석처리
  /*
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
    */
  try {
    const { name, items, parentCategoryId, createdAt, updatedAt, deletedAt } =
      req.body;
    const newCategory = await CategoryModel.create({
      name,
      items,
      parentCategoryId,
      createdAt,
      updatedAt,
      deletedAt,
    });
    res.json(newCategory);
  } catch (err) {
    next(err);
  }
});

// 모든 카테고리 조회
// 메인 페이지에서 보여지도록
// categoryRouter.get("/", async (req, res, next) => {
//   console.log("모든 카테고리 조회");
//   try {
//     const categories = await CategoryModel.find({ deletedAt: null });
//     return res.status(200).json({
//       status: 200,
//       msg: "카테고리 조회",
//       data: categories,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// 하나의 카테고리만 조회
categoryRouter.get("/:categoryId", async (req, res, next) => {
  console.log("하나의 카테고리만 조회");
  try {
    const { categoryId } = req.params;
    const category = await CategoryModel.findOne({ _id: categoryId });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// 카테고리 페이지
// 서브 카테고리 별 상품 조회
categoryRouter.get("/mainPart/:categoryId", async (req, res, next) => {
  console.log("카테고리 별 상품 조회");
  if (req.body.parentCategoryId === null) {
    const { categoryId } = req.params;
    const categoryItem = await CategoryModel.findOne({
      _id: categoryId,
    }).populate("items");
    res.json(categoryItem);
  } else {
    const { parentCategoryId } = req.body;
  }
  try {
  } catch (err) {
    next(err);
  }
});
// 서브 카테고리 별 상품 조회
categoryRouter.get("/subPart/:categoryId", async (req, res, next) => {
  console.log("카테고리 별 상품 조회");
  if (req.body.parentCategoryId === null) {
    const { categoryId } = req.params;
    const categoryItem = await CategoryModel.findOne({
      _id: categoryId,
    }).populate("items");
    res.json(categoryItem);
  } else {
    const { parentCategoryId } = req.body;
  }
  try {
  } catch (err) {
    next(err);
  }
});

// 카테고리 수정
categoryRouter.put("/update/:categoryId", async (req, res, next) => {
  console.log("카테고리 수정");
  // request/response 확인을 위해 주석처리
  /*const { curRole } = req;
    if(curRole !== "admin") {
        throw new Error("관리자 권한이 없습니다.");
    }*/
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const currentTime = Date.now();
    const category = await CategoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        name,
        updatedAt: currentTime,
      }
    );
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// 카테고리 삭제
// 삭제 api를 불러올때 진짜 정보를 삭제하는 것이 아닌 deletedAt값만 추가하여 저장은 해놓지만, get할때는 deletedAt의 값이 null인 것만 불러와야한다.
/*
categoryRouter.delete("/:categoryId", async (req, res, next) => {
    console.log("카테고리 삭제");
    // request/response 확인을 위해 주석처리
    
    // const { curRole } = req;
    // if(curRole !== "admin") {
    //     throw new Error("관리자 권한이 없습니다.");
    }
    try {
        const { categoryId } = req.params;
        const deleteCategory = await CategoryModel.deleteOne({ _id: categoryId });
        res.json(deleteCategory);
    } catch(err) {
        next(err);
    }
})
*/
// soft delete

categoryRouter.put("/delete/:categoryId", async (req, res, next) => {
  console.log("카테고리 삭제");

  try {
    const { categoryId } = req.params;
    const currentTime = Date.now();
    const deletedCategory = await CategoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        deletedAt: currentTime,
      }
    );
    res.json(deletedCategory);
  } catch (err) {
    next(err);
  }
});

module.exports = categoryRouter;
