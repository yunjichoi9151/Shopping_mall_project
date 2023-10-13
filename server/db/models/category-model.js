const { model } = require("mongoose");
const categorySchema = require("../schemas/category-schema");

const CategoryModel = model("Category", categorySchema);

module.exports = CategoryModel;
