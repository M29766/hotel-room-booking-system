const express = require("express");

const {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking
} = require("../controllers/bookingController");

const router = express.Router();

// Get all bookings
router.get("/", getAllBookings);

// Get one booking
router.get("/:id", getBookingById);

// Create booking
router.post("/", createBooking);

// Cancel booking
router.delete("/:id", cancelBooking);

module.exports = router;