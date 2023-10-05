const { model } = require("mongoose");
const { joinInfoSchema } = require("../schemas/joinInfo-schema");

const JoinInfo = model("JoinInfo", joinInfoSchema);

export { JoinInfo };
