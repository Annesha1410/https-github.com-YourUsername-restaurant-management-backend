const User = require("../models/user-models");

const getUserList = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteUser = (req, res) => {

};

module.exports = {
    getUserList,
    deleteUser
};