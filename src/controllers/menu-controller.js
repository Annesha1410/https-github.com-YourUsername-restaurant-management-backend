const MenuItem = require("../models/menu-models");
const cloudinary = require("../config/cloudinary");


// Get all menu items
const getmenuList = async (req, res) => {
    try {

        const menuItems = await MenuItem.find();

        res.status(200).json({
            success: true,
            message: "Menu Items Fetched Successfully",
            data: menuItems
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get one menu item
const getMenuById = async (req, res) => {
    try {

        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Menu Item Fetched Successfully",
            data: menuItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Create menu
const CreateMenu = async (req, res) => {
    try {

        const {
            name,
            desc,
            category,
            price,
            available
        } = req.body;

        console.log("Menu data:", req.body);
        console.log("Image:", req.file);


        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }


        const uploadImage = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "restaurant-management/menu-items"
            }
        );


        const response = await MenuItem.create({

            name,
            desc,
            category,
            price,

            available:
                available === undefined
                    ? true
                    : available === "true" || available === true,

            image: {
                url: uploadImage.url,
                public_id: uploadImage.public_id
            }

        });


        res.status(201).json({
            success: true,
            message: "Menu created successfully",
            data: response
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Update menu
const updateMenu = async (req, res) => {
    try {

        const {
            name,
            desc,
            category,
            price,
            available
        } = req.body;


        const menuItem = await MenuItem.findById(req.params.id);


        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }


        // Update only if value is provided
        if (name !== undefined) {
            menuItem.name = name;
        }

        if (desc !== undefined) {
            menuItem.desc = desc;
        }

        if (category !== undefined) {
            menuItem.category = category;
        }

        if (price !== undefined) {
            menuItem.price = price;
        }


        // Available / Unavailable
        if (available !== undefined) {

            menuItem.available =
                available === "true" ||
                available === true;

        }


        menuItem.updatedAt = Date.now();


        // New image uploaded
        if (req.file) {

            // Delete old image
            if (menuItem.image?.public_id) {

                await cloudinary.uploader.destroy(
                    menuItem.image.public_id
                );

            }


            // Upload new image
            const uploadImage =
                await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        folder:
                            "restaurant-management/menu-items"
                    }
                );


            menuItem.image = {
                url: uploadImage.url,
                public_id: uploadImage.public_id
            };

        }


        const updatedMenu =
            await menuItem.save();


        res.status(200).json({

            success: true,

            message:
                "Menu item updated successfully",

            data: updatedMenu

        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Delete menu
const deleteMenu = async (req, res) => {
    try {

        const menuItem =
            await MenuItem.findById(req.params.id);


        if (!menuItem) {

            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });

        }


        // Delete image from Cloudinary
        if (menuItem.image?.public_id) {

            await cloudinary.uploader.destroy(
                menuItem.image.public_id
            );

        }


        await MenuItem.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Menu item deleted successfully"

        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getmenuList,
    getMenuById,
    CreateMenu,
    updateMenu,
    deleteMenu
};