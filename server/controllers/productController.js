import SupplierModal from "../models/Supplier.js";
import Category from "../models/Category.js";

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
