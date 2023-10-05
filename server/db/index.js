import mongoose from "mongoose";
import categorySchema from "./schemas/category-schema";
import commentSchema from "./schemas/comment-schema";
import itemSchema from "./schemas/item-schema";
import joinInfoSchema from "./schemas/joinInfo-schema";
import orderSchema from "./schemas/order-schema";
import userSchema from "./schemas/user-schema";

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("connected", async () => {
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL);
});
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

exports.Data = mongoose.model("Data", categorySchema);