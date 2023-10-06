const mongoose = require("mongoose");
const User = require("./models/user-model");

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;


db.on("connected", async () => {
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + process.env.MONGO_URI);
});
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + process.env.MONGO_URI + "\n" + error)
);

// require 코드를 간결하게
// 다른 코드에서 require시 require("../db"); 로 가능

export * from "./models/category-model";
export * from "./models/comment-model";
export * from "./models/item-model";
export * from "./models/itemImage-model";
export * from "./models/order-model";
export * from "./models/user-model";
export * from "./models/userPrivate-model";
