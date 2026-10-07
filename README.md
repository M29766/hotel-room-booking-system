# 🏨 Hotel Room Booking System

A full-stack web application for managing hotel rooms and bookings. The system allows users to add rooms, search for available rooms, make bookings, view bookings, and cancel bookings.

The project demonstrates a complete **frontend-backend-database architecture** using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

---

## 🌐 Live Demo

### Frontend
https://hotel-room-booking-system-frontend.vercel.app/

### Backend API
https://hotel-room-booking-system-dzox.onrender.com/

> Note: The Vercel URL may be different if the project was assigned a custom URL by Vercel.

---

## 📌 Project Overview

The Hotel Room Booking System provides a simple interface for managing hotel rooms and reservations.

Users can:

- Add new hotel rooms
- View all rooms
- Search for available rooms
- Book a room
- View all bookings
- Cancel bookings
- Delete rooms
- Check room availability
- Prevent overlapping bookings

The frontend communicates with the backend using REST APIs, while MongoDB Atlas is used to store room and booking data.

---

## 🎯 Aim

To design and develop a full-stack **Hotel Room Booking System** that enables users to manage hotel rooms, search for available rooms, make bookings, and cancel bookings using a web-based interface.

---

## 🎯 Objectives

The main objectives of this project are:

1. To develop a user-friendly hotel room booking interface.
2. To manage hotel room information.
3. To manage guest booking information.
4. To implement RESTful APIs using Express.js.
5. To connect the backend with MongoDB.
6. To perform CRUD operations.
7. To implement room availability checking.
8. To prevent double booking of rooms.
9. To validate booking dates and user input.
10. To demonstrate frontend-backend communication using the Fetch API.
11. To deploy the application using cloud hosting platforms.

---

# ✨ Features

## 🏨 Room Management

- Add new rooms
- View all rooms
- Display room number
- Display room type
- Display room price
- Display availability
- Delete rooms

## 🔎 Room Search

Users can search for available rooms using:

- Room type
- Check-in date
- Check-out date

## 📅 Room Booking

Users can:

- Enter guest name
- Select a room
- Select check-in date
- Select check-out date
- Confirm the booking

## 🚫 Double Booking Prevention

The system checks existing bookings before creating a new booking.

If the selected room is already booked for overlapping dates, the new booking is rejected.

## 📋 Booking Management

Users can:

- View all bookings
- View guest name
- View room information
- View check-in date
- View check-out date
- Cancel bookings

## ⚡ Dynamic Updates

The frontend communicates with the backend using JavaScript's `fetch()` API and REST endpoints.

## 📱 Responsive Interface

The frontend is designed to work on:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

## Backend

- Node.js
- Express.js
- REST API
- JavaScript

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Live Server
- Postman

---

# 🏗️ System Architecture

```text
                    USER
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │                 │
             │ HTML            │
             │ CSS             │
             │ JavaScript      │
             └────────┬────────┘
                      │
                  HTTPS / REST
                      │
                      ▼
             ┌─────────────────┐
             │     Render      │
             │                 │
             │ Node.js         │
             │ Express.js      │
             │ REST API        │
             └────────┬────────┘
                      │
                MongoDB Driver
                      │
                      ▼
             ┌─────────────────┐
             │ MongoDB Atlas   │
             │                 │
             │ HotelBooking    │
             │                 │
             │ Rooms           │
             │ Bookings        │
             └─────────────────┘
