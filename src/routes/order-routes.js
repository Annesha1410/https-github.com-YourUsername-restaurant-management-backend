const express = require("express");

const {
    createOrder,
    getOrders,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/order-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();


// Customer
router.post("/", createOrder);


// Admin
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getOrders
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteOrder
);


module.exports = router;