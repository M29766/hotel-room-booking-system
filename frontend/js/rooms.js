const API_URL = "http://localhost:5000/api";

const roomForm = document.getElementById("roomForm");
const roomsContainer = document.getElementById("roomsContainer");
const roomMessage = document.getElementById("roomMessage");
const refreshRooms = document.getElementById("refreshRooms");


// Load rooms when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadRooms();
});


// Add room
roomForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const roomNumber =
        document.getElementById("roomNumber").value.trim();

    const type =
        document.getElementById("roomType").value;

    const price =
        Number(document.getElementById("roomPrice").value);

    const availability =
        document.getElementById("availability").value;


    if (!roomNumber || !type || !price) {

        showMessage(
            "Please fill all required fields.",
            "error"
        );

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/rooms`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    roomNumber,
                    type,
                    price,
                    availability
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.message || "Failed to add room"
            );
        }


        showMessage(
            "Room added successfully!",
            "success"
        );


        roomForm.reset();

        loadRooms();

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

});


// Load all rooms
async function loadRooms() {

    roomsContainer.innerHTML =
        `<p class="loading">Loading rooms...</p>`;


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


        displayRooms(data.rooms);

    } catch (error) {

        roomsContainer.innerHTML = `
            <p class="empty-message">
                ${error.message}
            </p>
        `;

    }

}


// Display rooms
function displayRooms(rooms) {

    if (!rooms || rooms.length === 0) {

        roomsContainer.innerHTML = `
            <p class="empty-message">
                No rooms found. Add your first room.
            </p>
        `;

        return;
    }


    roomsContainer.innerHTML = rooms.map(room => {

        const statusClass =
            room.availability === "Available"
                ? "status-available"
                : "status-unavailable";


        return `

            <div class="room-card">

                <div class="room-icon">
                    🏨
                </div>


                <h3>
                    Room ${room.roomNumber}
                </h3>


                <p class="room-type">
                    ${room.type}
                </p>


                <p class="room-price">
                    ₹${room.price} / night
                </p>


                <span
                    class="room-status ${statusClass}"
                >
                    ${room.availability}
                </span>


                <div class="room-actions">

                    ${room.availability === "Available"
                ?
                `
                        <a
                            href="booking.html?room=${room._id}"
                            class="primary-btn"
                        >
                            Book
                        </a>
                        `
                :
                ""
            }


                    <button
                        class="danger-btn"
                        onclick="deleteRoom('${room._id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


// Delete room
async function deleteRoom(roomId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this room?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/rooms/${roomId}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to delete room"
            );

        }


        showMessage(
            "Room deleted successfully!",
            "success"
        );


        loadRooms();

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

}


// Refresh button
refreshRooms.addEventListener(
    "click",
    loadRooms
);


// Message
function showMessage(message, type) {

    roomMessage.innerHTML = `
        <div
            class="${type === "success"
            ? "success-message"
            : "error-message"}"
        >
            ${message}
        </div>
    `;


    setTimeout(() => {

        roomMessage.innerHTML = "";

    }, 4000);

}