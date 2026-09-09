const MenuItem = require("../models/menu-models");

const cloudinary = require("../config/cloudinary");

const getmenuList = async (req, res) => {

     try {

        const menuItems = await MenuItem.find();

        res.status(200).json({
            success: true,
            message: "Menu Items Fetched Successfully",
            data: menuItems
        });

    } catch (error){
         res.status(500).json({
            success: false,
            message: error.message
        });

    }};

    const getMenuById = async (req, res) => {
       try { 
        const menuItem = await MenuItem.findById(req.params.id); 
        res.status(200).json({ success: true, 
          message: "Menu Item Fetched Successfully", data: menuItem 
        }); 
      } catch (error) { 
        res.status(500).json({ 
          success: false, 
          message: error.message
         }); 
        } 
      };

    const CreateMenu= async (req,res)=>{
        try{
        const{
            name, desc, category, price, availability } = req.body;
            console.log(
                "data is coming",
                name,
                desc,
                category,
                price,
                availability
            );
            console.log("coming image", req.file);
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "restaurant-management/menu-items",
    });

    console.log("uploadImage", uploadImage);
    const response = await MenuItem.create({
      name,
      desc,
      price,
      category,
     availability,
      image: {
        url: uploadImage.url,
        public_id: uploadImage.public_id,
      },
    });
    res.status(201).json({
      success: true,
      message: "Menu created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

  const updateMenu= async(req,res)=>{

  };

  const deleteMenu= async(req,res)=> {

  };
  module.exports = {
  getmenuList,
   getMenuById,
  CreateMenu,
  updateMenu,
  deleteMenu,
};


        


    

    