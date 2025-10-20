CREATE TABLE User (

    user_id INT AUTO_INCREMENT PRIMARY KEY,

    u_name VARCHAR(100) NOT NULL,

    gender ENUM('Male','Female','Other') NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    age INT CHECK (age > 0)

);

CREATE TABLE Coach (

    coach_id INT AUTO_INCREMENT PRIMARY KEY,

    c_name VARCHAR(100) NOT NULL,

    specialization VARCHAR(100) NOT NULL,

    schedule VARCHAR(50) DEFAULT 'Not Assigned',

    contact VARCHAR(20) UNIQUE

);

CREATE TABLE FitnessProgress (

    progress_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    date DATE NOT NULL,

    weight DECIMAL(5,2),

    height DECIMAL(5,2),

    bmi DECIMAL(4,2),

    workout_type VARCHAR(100),

    duration INT,  -- in minutes

    notes TEXT,

    FOREIGN KEY (user_id) REFERENCES User(user_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE

);

CREATE TABLE TrainingSessions (

    session_id INT AUTO_INCREMENT PRIMARY KEY,

    coach_id INT NOT NULL,

    session_name VARCHAR(100) NOT NULL,

    sports VARCHAR(50) NOT NULL,

    schedule VARCHAR(100),

    location VARCHAR(100),

    max_participants INT DEFAULT 20,

    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE

);

CREATE TABLE Facility (

    facility_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    type VARCHAR(50) NOT NULL,

    availability ENUM('available','unavailable') DEFAULT 'available',

    location VARCHAR(100) NOT NULL

);

CREATE TABLE Booking (

    booking_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    facility_id INT,

    datetime DATETIME NOT NULL,

    status ENUM('pending','approved','rejected') DEFAULT 'pending',

    FOREIGN KEY (user_id) REFERENCES User(user_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE,

    FOREIGN KEY (facility_id) REFERENCES Facility(facility_id)

        ON UPDATE CASCADE

        ON DELETE SET NULL

);

CREATE TABLE Event (

    event_id INT AUTO_INCREMENT PRIMARY KEY,

    e_name VARCHAR(100) NOT NULL,

    sports VARCHAR(50) NOT NULL,

    date DATE NOT NULL,

    coach_id INT,

    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)

        ON UPDATE CASCADE

        ON DELETE SET NULL

);

CREATE TABLE Participants (

    participant_id INT AUTO_INCREMENT PRIMARY KEY,

    event_id INT NOT NULL,

    user_id INT NOT NULL,

    result VARCHAR(50) DEFAULT 'Pending',

    score INT DEFAULT 0,

    FOREIGN KEY (event_id) REFERENCES Event(event_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE,

    FOREIGN KEY (user_id) REFERENCES User(user_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE

);

CREATE TABLE Attendance (

    attendance_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    coach_id INT NOT NULL,

    date DATE NOT NULL,

    status ENUM('present','absent') NOT NULL,

    FOREIGN KEY (user_id) REFERENCES User(user_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE,

    FOREIGN KEY (coach_id) REFERENCES Coach(coach_id)

        ON UPDATE CASCADE

        ON DELETE CASCADE

);

