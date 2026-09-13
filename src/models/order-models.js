const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Preparing",
            "Completed",
            "Cancelled"
        ],
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;