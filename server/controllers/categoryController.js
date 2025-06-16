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