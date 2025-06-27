import SupplierModal from "../models/Supplier.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const suppliers = await SupplierModal.find();
    const categories = await Category.find();
    console.log("Fetched suppliers: ", suppliers);
    return res.status(200).json({ success: true, suppliers,categories });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ success: false, message: "Server error in getting suppliers" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, supplierId } = req.body;

    const newProduct = new Product({ name, description,price,stock,categoryId,supplierId });
    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding Product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
