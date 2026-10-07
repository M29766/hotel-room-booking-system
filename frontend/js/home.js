const API_URL = "http://localhost:5000/api";

const searchForm = document.getElementById("searchForm");
const searchResults = document.getElementById("searchResults");


// Search rooms
searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const type = document.getElementById("roomType").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    if (!checkIn || !checkOut) {
        showSearchMessage(
            "Please select check-in and check-out dates."
        );
        return;
    }

    if (checkIn >= checkOut) {
        showSearchMessage(
            "Check-out date must be after check-in date."
        );
        return;
    }

    searchResults.innerHTML =
        `<p class="loading">Searching rooms...</p>`;

    try {

        let url =
            `${API_URL}/rooms/search?checkIn=${checkIn}&checkOut=${checkOut}`;

        if (type) {
            url += `&type=${encodeURIComponent(type)}`;
        }

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to search rooms"
            );
        }

        displayRooms(data.rooms, checkIn, checkOut);

    } catch (error) {

        showSearchMessage(error.message);

    }

});


function displayRooms(rooms, checkIn, checkOut) {

    if (!rooms || rooms.length === 0) {

        searchResults.innerHTML = `
            <p class="empty-message">
                No rooms are available for the selected dates.
            </p>
        `;

        return;
    }

    searchResults.innerHTML = rooms.map(room => {

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

                <span class="room-status status-available">
                    Available
                </span>

                <div class="room-actions">

                    <a
                        href="booking.html?room=${room._id}&checkIn=${checkIn}&checkOut=${checkOut}"
                        class="primary-btn"
                    >
                        Book Now
                    </a>

                </div>

            </div>
        `;

    }).join("");

}


function showSearchMessage(message) {

    searchResults.innerHTML = `
        <p class="empty-message">
            ${message}
        </p>
    `;

}