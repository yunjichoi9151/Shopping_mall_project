const { model } = require("mongoose");
const { joinInfoSchema } = require("../schemas/user-schema");

const JoinInfo = model("JoinInfo", joinInfoSchema);

export { JoinInfo };
