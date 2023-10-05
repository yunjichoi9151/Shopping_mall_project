const { model } = require("mongoose");
const { orderSchema } = require("../schemas/order-schema");

const Order = model("Order", orderSchema);

export { Order };
