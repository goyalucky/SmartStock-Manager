import Category from '../models/Category.js'

export const addCategory = async (req,res) => {
    try {
        const {categoryName,categoryDescription} = req.body;

        const existingCategory = await Category.findOne({categoryName});
        if(existingCategory){
            return res.status(400).json({message:"Category already exists"});
        }

        const newCategory = new Category({
            categoryName,
            categoryDescription
        });
        await newCategory.save();
        res.status(201).json({success: true,message:"Category created successfully"});
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({success: false,message: 'Error adding category'});
    }
}

export const getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({success: true,categories});
    } catch (error) {
        console.log('Error fetching categories:', error);
        return res.status(500).json({success: false,message: 'Server error in getting categories'});
    }
}