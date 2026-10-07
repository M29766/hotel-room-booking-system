const Booking = require("../models/Booking");
const Room = require("../models/Room");


// Create a booking
const createBooking = async (req, res) => {
    try {
        const {
            room,
            guestName,
            checkIn,
            checkOut
        } = req.body;

        // Validate required fields
        if (!room || !guestName || !checkIn || !checkOut) {
            return res.status(400).json({
                success: false,
                message: "Room, guest name, check-in and check-out are required"
            });
        }

        // Find room
        const roomData = await Room.findById(room);

        if (!roomData) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Check room availability
        if (roomData.availability === "Unavailable") {
            return res.status(400).json({
                success: false,
                message: "This room is currently unavailable"
            });
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid check-in or check-out date"
            });
        }

        if (startDate >= endDate) {
            return res.status(400).json({
                success: false,
                message: "Check-out date must be after check-in date"
            });
        }

        // Prevent booking in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate < today) {
            return res.status(400).json({
                success: false,
                message: "Check-in date cannot be in the past"
            });
        }

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            room: room,
            status: "Confirmed",
            checkIn: { $lt: endDate },
            checkOut: { $gt: startDate }
        });

        if (overlappingBooking) {
            return res.status(409).json({
                success: false,
                message: "Room is already booked for the selected dates"
            });
        }

        // Create booking
        const booking = await Booking.create({
            room,
            guestName,
            checkIn: startDate,
            checkOut: endDate,
            status: "Confirmed"
        });

        const populatedBooking = await Booking.findById(booking._id)
            .populate("room");

        res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking: populatedBooking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("room")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get one booking
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("room");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Cancel booking
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Booking is already cancelled"
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking
};