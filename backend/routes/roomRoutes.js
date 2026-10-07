const express = require("express");

const {
    addRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    searchAvailableRooms
} = require("../controllers/roomController");

const router = express.Router();

// Search available rooms
router.get("/search", searchAvailableRooms);

// Get all rooms
router.get("/", getAllRooms);

// Get one room
router.get("/:id", getRoomById);

// Add room
router.post("/", addRoom);

// Update room
router.put("/:id", updateRoom);

// Delete room
router.delete("/:id", deleteRoom);

module.exports = router;