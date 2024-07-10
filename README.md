# Booking Service

This is a Booking Service API built with Node.js and Express.js, using MongoDB as the data store. The service allows users to choose seats and book them. The API provides endpoints for creating bookings, retrieving bookings, and fetching seat pricing.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/booking-service.git
    cd booking-service
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:

    ```plaintext
    MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
    ```

## Environment Variables

The following environment variables need to be set in the `.env` file:

- `MONGO_URI`: MongoDB connection string

## Usage

1. Seed the database with initial data:

    ```sh
    node src/populateDatabase.js
    ```

2. Start the server:

    ```sh
    npm start
    ```

3. The API will be available at `http://localhost:8080`.

## API Endpoints

### Get All Seats

- **URL:** `/api/seats`
- **Method:** `GET`
- **Description:** Retrieve all seats, ordered by seat class, with a boolean indicating if the seat is booked.
- **Response:**

    ```json
    [
        {
            "_id": "60f8b5d5c4a9b4c6348c7d35",
            "id": "654059941-2",
            "seat_class": "H",
            "is_booked": false
        },
        ...
    ]
    ```

### Get Seat Pricing

- **URL:** `/api/seats/:id`
- **Method:** `GET`
- **Description:** Retrieve the seat details along with the pricing based on the seat class and booking percentage.
- **Response:**

    ```json
    {
        "_id": "60f8b5d5c4a9b4c6348c7d35",
        "id": "654059941-2",
        "seat_class": "H",
        "is_booked": false,
        "price": 477.06
    }
    ```

### Create Booking

- **URL:** `/api/booking`
- **Method:** `POST`
- **Description:** Create a booking for the selected seats.
- **Request Body:**

    ```json
    {
        "seat_ids": ["871034850-6", "704770716-6"],
        "name": "Spider man",
        "phone": "9988776655",
        "email": "spider@example.com"
    }
    ```

- **Response:**

    ```json
    {
        "booking_id": "ef7282b9-e15d-4dac-aa71-43efd750e8a3",
        "total_amount": 570.73
    }
    ```

### Retrieve Bookings

- **URL:** `/api/bookings`
- **Method:** `GET`
- **Description:** Retrieve all bookings created by the user identified by email or phone number.
- **Query Parameters:**

    - `userIdentifier`: Email or phone number of the user

- **Response:**

    ```json
    [
        {
            "_id": "60f8b5d5c4a9b4c6348c7d35",
            "seat_ids": ["871034850-6", "704770716-6"],
            "name": "Spider man",
            "phone": "9988776655",
            "email": "spider@example.com",
            "booking_id": "ef7282b9-e15d-4dac-aa71-43efd750e8a3",
            "total_amount": 570.73
        }
    ]
    ```

## Data Models

### Booking

- `seat_ids`: Array of seat IDs
- `name`: Name of the user
- `phone`: Phone number of the user
- `email`: Email of the user
- `booking_id`: Unique booking identifier
- `total_amount`: Total amount of the booking

### Seat

- `id`: Seat identifier
- `seat_class`: Seat class
- `is_booked`: Boolean indicating if the seat is booked

### Pricing

- `seat_class`: Seat class
- `min_price`: Minimum price
- `normal_price`: Normal price
- `max_price`: Maximum price

### BookingDetails

- `booking_id`: Unique booking identifier
- `seat_ids`: Array of seat IDs
- `name`: Name of the user
- `phone`: Phone number of the user
- `email`: Email of the user
- `total_amount`: Total amount of the booking
- `created_at`: Timestamp of the booking creation

## Additional Features

- **Notification Integration**: You can integrate third-party services like Twilio, SendGrid, or Textlocal to send booking confirmation notifications.
- **Data Seeding**: The `populateDatabase.js` script seeds the database with initial data from predefined arrays.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request.


