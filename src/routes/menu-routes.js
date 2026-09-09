const express = require("express");

const upload = require("../middleware/upload-middleware");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const {
    getmenuList,
     getMenuById,
    CreateMenu,
    updateMenu,
    deleteMenu
} = require("../controllers/menu-controller");

const router = express.Router();

// Public route
router.get("/", getmenuList);

router.get("/:id", getMenuById);

// Admin routes
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    CreateMenu
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateMenu
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteMenu
);

module.exports = router;

