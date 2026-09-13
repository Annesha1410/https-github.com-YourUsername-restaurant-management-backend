const Order = require("../models/order-models");

// Create Order
const createOrder = async (req, res) => {
    try {

        const {
            customerName,
            customerEmail,
            itemName,
            quantity,
            totalPrice
        } = req.body;

        const order = await Order.create({
            customerName,
            customerEmail,
            itemName,
            quantity,
            totalPrice
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get All Orders
const getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Delete Order
const deleteOrder = async (req, res) => {
    try {

        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus,
    deleteOrder
};