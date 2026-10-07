const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: String,
            required: [true, "Room number is required"],
            unique: true,
            trim: true
        },

        type: {
            type: String,
            required: [true, "Room type is required"],
            enum: ["Single", "Double", "Deluxe", "Suite"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Room price is required"],
            min: [0, "Price cannot be negative"]
        },

        availability: {
            type: String,
            enum: ["Available", "Unavailable"],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Room", roomSchema);