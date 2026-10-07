const API_URL = "http://localhost:5000/api";

const bookingsContainer =
    document.getElementById(
        "bookingsContainer"
    );

const bookingMessage =
    document.getElementById(
        "bookingMessage"
    );

const refreshBookings =
    document.getElementById(
        "refreshBookings"
    );


// Load bookings
document.addEventListener(
    "DOMContentLoaded",
    loadBookings
);


// Refresh
refreshBookings.addEventListener(
    "click",
    loadBookings
);


// Get bookings
async function loadBookings() {

    bookingsContainer.innerHTML =
        `<p class="loading">Loading bookings...</p>`;


    try {

        const response =
            await fetch(
                `${API_URL}/bookings`
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load bookings"
            );

        }


        displayBookings(data.bookings);

    } catch (error) {

        bookingsContainer.innerHTML = `
            <p class="empty-message">
                ${error.message}
            </p>
        `;

    }

}


// Display bookings
function displayBookings(bookings) {

    if (!bookings || bookings.length === 0) {

        bookingsContainer.innerHTML = `
            <p class="empty-message">
                No bookings found.
            </p>
        `;

        return;
    }


    bookingsContainer.innerHTML =
        bookings.map(booking => {

            const room =
                booking.room;


            const checkIn =
                formatDate(booking.checkIn);


            const checkOut =
                formatDate(booking.checkOut);


            const isCancelled =
                booking.status === "Cancelled";


            return `

                <div class="booking-card">


                    <div class="booking-info">

                        <h3>
                            ${escapeHTML(
                booking.guestName
            )}
                        </h3>

                        <p>
                            Guest
                        </p>

                    </div>


                    <div>

                        <span class="booking-label">
                            Room
                        </span>

                        <span class="booking-value">

                            ${room
                    ? `Room ${room.roomNumber}`
                    : "N/A"
                }

                        </span>

                    </div>


                    <div>

                        <span class="booking-label">
                            Check-in
                        </span>

                        <span class="booking-value">
                            ${checkIn}
                        </span>

                    </div>


                    <div>

                        <span class="booking-label">
                            Check-out
                        </span>

                        <span class="booking-value">
                            ${checkOut}
                        </span>

                    </div>


                    <div>

                        <span
                            class="
                                room-status
                                ${isCancelled
                    ? "status-unavailable"
                    : "status-available"
                }
                            "
                        >
                            ${booking.status}
                        </span>


                        ${!isCancelled
                    ?
                    `
                            <button
                                class="danger-btn"
                                onclick="
                                    cancelBooking(
                                        '${booking._id}'
                                    )
                                "
                            >
                                Cancel
                            </button>
                            `
                    :
                    ""
                }

                    </div>


                </div>

            `;

        }).join("");

}


// Cancel booking
async function cancelBooking(bookingId) {

    const confirmed =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/bookings/${bookingId}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to cancel booking"
            );

        }


        showMessage(
            "Booking cancelled successfully!",
            "success"
        );


        loadBookings();

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );

    }

}


// Format date
function formatDate(dateString) {

    if (!dateString) {
        return "N/A";
    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// Prevent HTML injection
function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


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


    setTimeout(() => {

        bookingMessage.innerHTML = "";

    }, 4000);

}