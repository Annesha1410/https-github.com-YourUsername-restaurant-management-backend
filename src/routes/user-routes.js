const express = require("express");

const {
    getUserList,
    deleteUser
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getUserList);

router.delete("/:id", deleteUser);

module.exports = router;