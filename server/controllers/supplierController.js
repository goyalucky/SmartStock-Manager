import SupplierModal from "../models/Supplier.js";

export const addSupplier = async (req,res) => {
    try {
        const {name,email,number,address} = req.body;

        const existingSupplier = await SupplierModal.findOne({name});
        if(existingSupplier){
            return res.status(400).json({message:"Supplier already exists"});
        }

        const newSupplier = new SupplierModal({
           name,
           email,
           number,
           address
        });
        await newSupplier.save();
        res.status(201).json({success: true,message:"Supplier added successfully"});
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({success: false,message: 'Server error'});
    }
}

export const getSuppliers = async (req,res) => {
    try {
        const suppliers = await SupplierModal.find();
        return res.status(200).json({success: true,suppliers});
    } catch (error) {
        console.log('Error fetching suppliers:', error);
        return res.status(500).json({success: false,message: 'Server error in getting suppliers'});
    }
}

