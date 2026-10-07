const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: [true, "Room is required"]
        },

        guestName: {
            type: String,
            required: [true, "Guest name is required"],
            trim: true
        },

        checkIn: {
            type: Date,
            required: [true, "Check-in date is required"]
        },

        checkOut: {
            type: Date,
            required: [true, "Check-out date is required"]
        },

        status: {
            type: String,
            enum: ["Confirmed", "Cancelled"],
            default: "Confirmed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);