const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

    image: {
        url: String,
        public_id: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const MenuItem = mongoose.model("MenuItem", menuSchema);

module.exports = MenuItem;