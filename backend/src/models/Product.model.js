import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

});
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;