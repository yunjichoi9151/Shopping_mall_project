const { model } = require("mongoose");
const { categorySchema } = require("../schemas/category-schema");

const Category = model("Category", categorySchema);

export { Category };