# Sports & Fitness Management System

A comprehensive web-based management system for sports facilities, fitness tracking, event management, and attendance monitoring in educational institutions.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Team Members](#team-members)
- [License](#license)

## 🎯 About

The **Sports & Fitness Management System (SFMS)** is designed to simplify and digitize the management of sports, fitness programs, and facility bookings in colleges and institutions. The system eliminates manual processes like double bookings, confusion in scheduling, and missing records by providing a centralized digital platform.

### Purpose

- **Students/Members**: Book facilities, register for tournaments, and track fitness progress
- **Coaches/Trainers**: Schedule training sessions, record attendance, and monitor player performance
- **Administrators**: Manage bookings, organize events, assign coaches, and generate reports

## ✨ Features

### Student Features
- 👤 **User Profile Management** - Create and update personal profiles
- 🏋️ **Fitness Progress Tracker** - Log weight, BMI, workouts, and track improvement over time
- 🏢 **Facility Booking** - Book badminton courts, gym slots, swimming pools, etc.
- 📊 **Booking Status** - View booking status (pending/approved/rejected)
- 🏆 **Event Registration** - Register for tournaments and sports events
- 📅 **Attendance Tracking** - View personal attendance records

### Coach Features
- 📝 **Mark Attendance** - Record student attendance for training sessions
- 🗓️ **Schedule Management** - View and manage training schedules
- 📈 **Student Progress Monitoring** - Track individual student performance
- 🏅 **Event Management** - View assigned events and participants

### Admin Features
- 📊 **System Overview Dashboard** - View statistics (total users, coaches, facilities, events)
- ✅ **Booking Approval/Rejection** - Manage facility booking requests
- 🏢 **Facility Management** - Add, edit, and delete sports facilities
- 👨‍🏫 **Coach Management** - Add and remove coaches from the system
- 🎯 **Event Organization** - Create events and assign coaches
- 👥 **User Management** - View and manage all system users
- 📈 **Reports Generation** - Generate usage and participation reports

## 💻 Technologies Used

### Frontend
- **React.js** (v18.2.0) - JavaScript library for building user interfaces
- **CSS3** - Custom styling (no CSS frameworks)
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js** (v14+) - JavaScript runtime environment
- **Express.js** (v4.18.2) - Web application framework for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **Body-Parser** - Request body parsing middleware

### Database
- **MySQL** (v8.0+) - Relational database management system
- **MySQL2** (v3.6.0) - MySQL client for Node.js

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **VS Code** - Code editor

## 🏗️ System Architecture

```
┌─────────────────┐
│   React.js      │
│   Frontend      │ ← User Interface Layer
│   (Port 3000)   │
└────────┬────────┘
         │
         │ HTTP Requests (REST API)
         │
┌────────▼────────┐
│   Express.js    │
│   Backend       │ ← Application Logic Layer
│   (Port 5000)   │
└────────┬────────┘
         │
         │ SQL Queries
         │
┌────────▼────────┐
│     MySQL       │
│    Database     │ ← Data Storage Layer
│  fitness_mgmt   │
└─────────────────┘
```

### Architecture Components:

1. **Frontend (React.js)**
   - Single Page Application (SPA)
   - Component-based architecture
   - State management using React Hooks
   - Role-based routing and access control

2. **Backend (Node.js + Express.js)**
   - RESTful API design
   - MVC pattern
   - Middleware for CORS and body parsing
   - Database connection management

3. **Database (MySQL)**
   - Relational database with normalized tables
   - Foreign key constraints for data integrity
   - Cascading updates and deletes

## 📥 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL Server (v8.0 or higher)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/sports-fitness-management.git
cd sports-fitness-management
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mysql2 cors body-parser

# Install nodemon for development (optional)
npm install --save-dev nodemon

# Create server.js file
# Copy the backend code from the project files
```

**Configure Database Connection** in `server.js`:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',    // Change this
  password: 'your_mysql_password', // Change this
  database: 'fitness_management'
});
```

**Update package.json scripts**:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 3: Frontend Setup

```bash
# Navigate back to root directory
cd ..

# Create React app
npx create-react-app frontend
cd frontend

# Copy App.js and App.css from project files to src/
# Replace src/App.js with the provided App.js
# Replace src/App.css with the provided App.css
```

## 🗄️ Database Setup

### Step 1: Create Database

```sql
CREATE DATABASE fitness_management;
USE fitness_management;
```

### Step 2: Create Tables

Execute the following SQL commands in order:

```sql
-- User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    u_name VARCHAR(100) NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age > 0)
);

-- Coach Table
CREATE TABLE Coach (
    coach_id INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    schedule VARCHAR(50) DEFAULT 'Not Assigned',
    contact VARCHAR(20) UNIQUE
);

-- Facility Table
CREATE TABLE Facility (
    facility_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    availability ENUM('available','unavailable') DEFAULT 'available',
    location VARCHAR(100) NOT NULL
);

-- Booking Table
CREATE TABLE Booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    facility_id INT,
    datetime DATETIME NOT NULL,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (facility_id) REFERENCES Facility(facility_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- Event Table
CREATE TABLE Event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    e_name VARCHAR(100) NOT NULL,
    sports VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    coach_id INT,
    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- Participants Table
CREATE TABLE Participants (
    participant_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    result VARCHAR(50) DEFAULT 'Pending',
    score INT DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Attendance Table
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    coach_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('present','absent') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Fitness Progress Table
CREATE TABLE FitnessProgress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,2),
    workout_type VARCHAR(100),
    duration INT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Training Sessions Table
CREATE TABLE TrainingSessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    coach_id INT NOT NULL,
    session_name VARCHAR(100) NOT NULL,
    sports VARCHAR(50) NOT NULL,
    schedule VARCHAR(100),
    location VARCHAR(100),
    max_participants INT DEFAULT 20,
    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);
```

### Step 3: Insert Sample Data

```sql
-- Insert Sample Users
INSERT INTO User (user_id, u_name, gender, email, age) VALUES
(10, 'Rohit Sharma', 'Male', 'rohit.sharma@example.com', 25),
(20, 'Priya Verma', 'Female', 'priya.verma@example.com', 22),
(30, 'Amit Kumar', 'Male', 'amit.kumar@example.com', 27),
(40, 'Sneha Patil', 'Female', 'sneha.patil@example.com', 21),
(50, 'Vikas Reddy', 'Male', 'vikas.reddy@example.com', 23);

-- Insert Sample Coaches
INSERT INTO Coach (coach_id, c_name, specialization, schedule, contact) VALUES
(60, 'Suresh Iyer', 'Badminton', 'Mon-Wed-Fri 6-8AM', '9876543210'),
(70, 'Meera Nair', 'Yoga', 'Tue-Thu 5-7PM', '9123456780'),
(80, 'Anil Deshmukh', 'Cricket', 'Sat-Sun 4-6PM', '9765432198'),
(90, 'Ritu Gupta', 'Gym Training', 'Mon-Fri 7-9AM', '9898989898'),
(100, 'Rahul Mehta', 'Swimming', 'Sat-Sun 8-10AM', '9823456789');

-- Insert Sample Facilities
INSERT INTO Facility (facility_id, name, type, availability, location) VALUES
(110, 'Badminton Court 1', 'Indoor', 'available', 'Main Sports Complex'),
(120, 'Yoga Hall', 'Indoor', 'available', 'Fitness Center'),
(130, 'Cricket Ground', 'Outdoor', 'unavailable', 'North Campus'),
(140, 'Gym Hall', 'Indoor', 'available', 'Health Building'),
(150, 'Swimming Pool', 'Outdoor', 'available', 'Recreation Zone');

-- Insert Sample Events
INSERT INTO Event (event_id, e_name, sports, date, coach_id) VALUES
(210, 'Intercollege Badminton Tournament', 'Badminton', '2025-11-15', 60),
(220, 'Morning Yoga Workshop', 'Yoga', '2025-11-18', 70),
(230, 'Cricket League Match', 'Cricket', '2025-11-20', 80),
(240, 'Fitness Challenge', 'Gym Training', '2025-11-22', 90),
(250, 'Annual Swimming Gala', 'Swimming', '2025-11-25', 100);
```

## 🚀 Usage

### Starting the Application

1. **Start the Backend Server**

```bash
cd backend
npm start

# Output: Server is running on http://localhost:5000
```

2. **Start the Frontend Application** (in a new terminal)

```bash
cd frontend
npm start

# Output: Compiled successfully! Open http://localhost:3000
```

3. **Access the Application**

Open your browser and navigate to: `http://localhost:3000`

### Login Credentials

**Admin Login:**
- Email: `mohammedtaheer303@gmail.com`
- Role: Administrator

**Student Login:**
- Email: Any email from the User table (e.g., `rohit.sharma@example.com`)
- Role: Student

**Coach Login:**
- Contact Number: Use contact number from Coach table (e.g., `9876543210`)
- Role: Coach
- **Note:** Coaches login using their contact number, not email

### User Workflows

#### For Students:
1. Register or Login
2. Complete profile information
3. Navigate to "Fitness Tracker" to log workouts
4. Go to "Book Facility" to reserve sports facilities
5. Check "My Bookings" for booking status
6. Register for events in "Events" tab
7. View attendance in "Attendance" tab

#### For Coaches:
1. Login with contact number (from Coach table)
2. View dashboard with personal schedule and statistics
3. Mark student attendance
4. Monitor student progress and performance
5. View assigned events and participants
6. Track attendance records

#### For Administrators:
1. Login with admin email
2. View system overview dashboard
3. Approve/reject booking requests
4. Add new coaches and facilities
5. Create and manage events
6. View all users and generate reports

## 📡 API Endpoints

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Coach Endpoints
- `GET /api/coaches` - Get all coaches
- `GET /api/coaches/:id` - Get coach by ID
- `POST /api/coaches` - Create new coach
- `PUT /api/coaches/:id` - Update coach
- `DELETE /api/coaches/:id` - Delete coach

### Facility Endpoints
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/:id` - Get facility by ID
- `POST /api/facilities` - Create new facility
- `PUT /api/facilities/:id` - Update facility
- `DELETE /api/facilities/:id` - Delete facility

### Booking Endpoints
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Event Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Participant Endpoints
- `GET /api/participants` - Get all participants
- `POST /api/participants` - Register participant
- `PUT /api/participants/:id` - Update participant
- `DELETE /api/participants/:id` - Delete participant

### Attendance Endpoints
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Fitness Progress Endpoints
- `GET /api/fitness-progress/:userId` - Get user fitness progress
- `POST /api/fitness-progress` - Add fitness progress

## 📁 Project Structure

```
sports-fitness-management/
│
├── backend/
│   ├── server.js              # Express server and API routes
│   ├── package.json           # Backend dependencies
│   └── node_modules/          # Backend packages
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Application styles
│   │   └── index.js           # React entry point
│   ├── package.json           # Frontend dependencies
│   └── node_modules/          # Frontend packages
│
├── database/
│   └── schema.sql             # Database schema and sample data
│
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```

## 📸 Screenshots

### Login Page
Beautiful gradient login page with sports imagery and role-based authentication.

### Student Dashboard
- Profile management with fitness tracking
- Facility booking interface with availability
- Real-time booking status updates
- Event registration and participation history

### Coach Dashboard
- Attendance marking system
- Training schedule management
- Student progress monitoring

### Admin Dashboard
- System overview with statistics
- Booking approval/rejection interface
- Coach and facility management
- Event organization tools

## 👥 Team Members

| Name | SRN | Role |
|------|-----|------|
| Piyush Sandeep Khandake | PES2UG23CS410 | Backend Developer |
| Mohamed Taheer | PES2UG24CS814 | Frontend Developer |

**Institution:** PES University  
**Section:** G  
**Date:** 26/08/2025

## 📊 Database Schema

### ER Diagram
The system uses a relational database with the following entities:
- User (Students/Members)
- Coach (Trainers)
- Facility (Sports facilities)
- Booking (Facility reservations)
- Event (Sports events/tournaments)
- Participants (Event registrations)
- Attendance (Training attendance)
- FitnessProgress (Personal fitness tracking)
- TrainingSessions (Training schedules)

### Relationships
- One User can have many Bookings
- One User can participate in many Events
- One Coach can be assigned to many Events
- One Facility can have many Bookings
- One Event can have many Participants

## 🔒 Security Features

- Role-based access control (Student, Coach, Admin)
- Email-based authentication
- Admin access restricted to specific email address
- SQL injection prevention using parameterized queries
- CORS enabled for secure cross-origin requests

## 🚧 Future Enhancements

- [ ] Password-based authentication with JWT tokens
- [ ] Email notifications for booking confirmations
- [ ] Payment integration for facility bookings
- [ ] Mobile responsive design improvements
- [ ] Real-time chat between students and coaches
- [ ] Advanced analytics and reporting dashboard
- [ ] Export reports to PDF/Excel
- [ ] Calendar view for bookings and events
- [ ] Rating system for coaches and facilities
- [ ] Social media integration

## 🐛 Known Issues

- Session persistence requires browser cookies
- Date/time formatting varies by browser locale
- Large file uploads not supported
- Email notifications not implemented

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created as part of academic coursework for DBMS Mini Project at PES University.

## 📞 Contact

For any queries or support, please contact:

- **Mohamed Taheer** - mohammedtaheer303@gmail.com
- **Piyush Sandeep Khandake** - (contact information)

---

## 🙏 Acknowledgments

- PES University for providing the platform and guidance
- Faculty members for their valuable feedback
- All team members for their dedicated efforts
- Open-source community for the technologies used

---

**Made with ❤️ by Team Sports & Fitness Management**

**Project Type:** DBMS Mini Project  
**Academic Year:** 2024-2025  
**Status:** ✅ Completed