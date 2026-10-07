const Room = require("../models/Room");
const Booking = require("../models/Booking");

// Add a new room
const addRoom = async (req, res) => {
    try {
        const { roomNumber, type, price, availability } = req.body;

        if (!roomNumber || !type || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Room number, type and price are required"
            });
        }

        const existingRoom = await Room.findOne({ roomNumber });

        if (existingRoom) {
            return res.status(409).json({
                success: false,
                message: "Room number already exists"
            });
        }

        const room = await Room.create({
            roomNumber,
            type,
            price,
            availability: availability || "Available"
        });

        res.status(201).json({
            success: true,
            message: "Room added successfully",
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ roomNumber: 1 });

        res.status(200).json({
            success: true,
            count: rooms.length,
            rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get single room
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update room
const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete room
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const activeBooking = await Booking.findOne({
            room: room._id,
            status: "Confirmed",
            checkOut: { $gte: new Date() }
        });

        if (activeBooking) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete a room with an active booking"
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Search available rooms
const searchAvailableRooms = async (req, res) => {
    try {
        const { type, checkIn, checkOut } = req.query;

        if (!checkIn || !checkOut) {
            return res.status(400).json({
                success: false,
                message: "Check-in and check-out dates are required"
            });
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        if (startDate >= endDate) {
            return res.status(400).json({
                success: false,
                message: "Check-out date must be after check-in date"
            });
        }

        const roomFilter = {
            availability: "Available"
        };

        if (type) {
            roomFilter.type = type;
        }

        const rooms = await Room.find(roomFilter);

        const availableRooms = [];

        for (const room of rooms) {
            const overlappingBooking = await Booking.findOne({
                room: room._id,
                status: "Confirmed",
                checkIn: { $lt: endDate },
                checkOut: { $gt: startDate }
            });

            if (!overlappingBooking) {
                availableRooms.push(room);
            }
        }

        res.status(200).json({
            success: true,
            count: availableRooms.length,
            rooms: availableRooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    addRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    searchAvailableRooms
};