# Eventhub

**Eventhub** is a web-based Event Management System that allows administrators to create and manage events while enabling users to register, reserve slots, and check in digitally.

Developed as an academic project, **Eventhub** aims to provide a modern, responsive, and streamlined event management experience.

---

# Features

## Admin Features

* Create, edit, and delete events
* Manage event details:

  * Event title
  * Description
  * Venue
  * Date and time
  * Available slots/tickets
* Monitor event registrations
* Track attendance records
* Generate event reports and summaries

## User Features

* Browse available events
* Register for events
* Reserve event slots/tickets
* Receive registration confirmation
* Attendance check-in using:

  * QR Code
  * Attendance Code

## Attendance Management

* Real-time attendance tracking
* Participant verification
* Attendance history logging

## Reports

* Event participation analytics
* Attendance summaries
* Ticket/slot utilization reports

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

## Backend

* PHP
* Laravel
* Laravel REST API

## Database & Services

* Supabase

  * PostgreSQL Database
  * Authentication
  * Storage

---

# System Architecture

```txt id="8tcbv3"
React + TypeScript Frontend
            ↓
     Laravel REST API
            ↓
        Supabase
     (PostgreSQL)
```

---

# Project Structure

```txt id="l6r4t8"
eventhub/
│
├── client/    # React + TypeScript + Vite + Tailwind
└── server/     # Laravel REST API
```

---

# Running the Project

## 1. Clone the Repository

```bash id="0t5m4s"
git clone https://github.com/your-username/eventhub.git
```

```bash id="nwb2k4"
cd eventhub
```

---

## 2. Install Dependencies

### Frontend

```bash id="5hn2je"
cd client
npm install
```

### Backend

Open another terminal:

```bash id="66z5v3"
cd server
composer install
```

---

## 3. Configure Environment Variables

Make sure both the frontend and backend `.env` files are properly configured before running the project.

---

## 4. Configure PHP configuration file

Make sure to uncomment these PHP extensions inside your `php.ini` file:
* extension=curl
* extension=exif
* extension=fileinfo
* extension=gd
* extension=gettext
* extension=mbstring
* extension=mysqli
* extension=openssl
* extension=pdo_mysql
* extension=pdo_pgsql
* extension=pdo_sqlite
* extension=pgsql
* extension=zip

---

## 5. Run the Backend Server

Inside the `server` folder:

```bash id="e2lmq4"
php artisan serve
```

Backend API URL:

```txt id="w1o2p6"
http://127.0.0.1:8000
```

---

## 6. Run the Frontend Server

Inside the `client` folder:

```bash id="mpw0ja"
npm run dev
```

Frontend URL:

```txt id="6o1udr"
http://localhost:5173
```

---

# Future Improvements

* QR Code Generation & Scanning
* Email Notifications
* Role-Based Authentication
* Event Categories & Tags
* Dashboard Analytics
* PDF Report Export
* Real-Time Notifications
* Mobile Responsive Enhancements

---

# Developers

Developed by:

* Bobadilla, Mark Allen G.
* Degulacion, Sharwyn C.
* Gutierrez, Marcus Jenne C.
* Logdat, Karl Joseph M.

---

# License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software for educational and personal purposes.
