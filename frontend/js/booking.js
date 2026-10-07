const API_URL = "https://hotel-room-booking-system-dzox.onrender.com/";

const bookingForm =
    document.getElementById("bookingForm");

const bookingRoom =
    document.getElementById("bookingRoom");

const bookingMessage =
    document.getElementById("bookingMessage");


// Get URL parameters
const urlParams =
    new URLSearchParams(window.location.search);

const selectedRoom =
    urlParams.get("room");

const selectedCheckIn =
    urlParams.get("checkIn");

const selectedCheckOut =
    urlParams.get("checkOut");


// Load rooms
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        setMinimumDates();

        await loadRooms();

        if (selectedRoom) {
            bookingRoom.value = selectedRoom;
        }

        if (selectedCheckIn) {
            document.getElementById(
                "bookingCheckIn"
            ).value = selectedCheckIn;
        }

        if (selectedCheckOut) {
            document.getElementById(
                "bookingCheckOut"
            ).value = selectedCheckOut;
        }

    }
);


// Set minimum date
function setMinimumDates() {

    const today =
        new Date().toISOString().split("T")[0];


    document.getElementById(
        "bookingCheckIn"
    ).min = today;


    document.getElementById(
        "bookingCheckOut"
    ).min = today;

}


// Load available rooms
async function loadRooms() {

    try {

        const response =
            await fetch(`${API_URL}/rooms`);

        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to load rooms"
            );

        }


        const availableRooms =
            data.rooms.filter(
                room =>
                    room.availability === "Available"
            );


        if (availableRooms.length === 0) {

            bookingRoom.innerHTML = `
                <option value="">
                    No rooms available
                </option>
            `;

            return;
        }


        bookingRoom.innerHTML = `
            <option value="">
                Select a room
            </option>

            ${availableRooms.map(room => `
                <option value="${room._id}">
                    Room ${room.roomNumber}
                    - ${room.type}
                    - ₹${room.price}/night
                </option>
            `).join("")}
        `;

    } catch (error) {

        bookingRoom.innerHTML = `
            <option value="">
                Failed to load rooms
            </option>
        `;

        showMessage(
            error.message,
            "error"
        );

    }

}


// Submit booking
bookingForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const guestName =
            document.getElementById(
                "guestName"
            ).value.trim();


        const room =
            bookingRoom.value;


        const checkIn =
            document.getElementById(
                "bookingCheckIn"
            ).value;


        const checkOut =
            document.getElementById(
                "bookingCheckOut"
            ).value;


        if (!guestName || !room || !checkIn || !checkOut) {

            showMessage(
                "Please fill all fields.",
                "error"
            );

            return;
        }


        if (checkIn >= checkOut) {

            showMessage(
                "Check-out date must be after check-in date.",
                "error"
            );

            return;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/bookings`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            room,
                            guestName,
                            checkIn,
                            checkOut
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Booking failed"
                );

            }


            showMessage(
                "Room booked successfully!",
                "success"
            );


            bookingForm.reset();


            setTimeout(() => {

                window.location.href =
                    "bookings.html";

            }, 1500);


        } catch (error) {

            showMessage(
                error.message,
                "error"
            );

        }

    }
);


// Show message
function showMessage(message, type) {

    bookingMessage.innerHTML = `
        <div
            class="${type === "success"
            ? "success-message"
            : "error-message"
        }"
        >
            ${message}
        </div>
    `;

}
