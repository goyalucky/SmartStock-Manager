import SupplierModal from "../models/Supplier.js";

export const addSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    const existingSupplier = await SupplierModal.findOne({ name });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists" });
    }

    const newSupplier = new SupplierModal({ name, email, number, address });
    await newSupplier.save();

    res.status(201).json({ success: true, message: "Supplier added successfully" });
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModal.find();
    console.log("Fetched suppliers: ", suppliers);
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ success: false, message: "Server error in getting suppliers" });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, address } = req.body;

    const existingSupplier = await SupplierModal.findById(id);
    if (!existingSupplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    await SupplierModal.findByIdAndUpdate(
      id,
      { name, email, number, address },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Supplier updated successfully" });
  } catch (error) {
    console.error("Error updating Supplier", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSupplier = await SupplierModal.findById(id);
    if (!existingSupplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    await SupplierModal.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting Supplier", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
