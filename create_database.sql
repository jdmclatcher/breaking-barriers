-- MAIN TABLE TO HOLD ALL USERS OF THE SYSTEM --
CREATE TABLE person(
    perID VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (perID)
);

INSERT INTO person VALUES
('admin1', 'admin1'),
('admin2', 'admin2'),
('instructor1', 'instructor1');

-- RELATIONAL TABLE SETUP FOR ADMINISTRATORS --
CREATE TABLE administrator (
    perID VARCHAR(100),
    PRIMARY KEY (perID),
    CONSTRAINT fk1 FOREIGN KEY (perID) REFERENCES person(perID)
);

INSERT INTO administrator VALUES
('admin1'),
('admin2');

-- COURSE MODULE TABLE --
CREATE TABLE module (
    moduleID INTEGER NOT NULL,
    moduleTitle VARCHAR(100),
    moduleDescription VARCHAR(500),
    PRIMARY KEY (moduleID)
);

INSERT INTO module VALUES
(1, 'The First Module', 'Here is a description of the first module.');

-- CREATE INSTRUCTOR TABLE --
CREATE TABLE instructor (
    perID VARCHAR(100) NOT NULL,
    moduleID INTEGER,
    PRIMARY KEY (perID),
    CONSTRAINT fk2 FOREIGN KEY (perID) REFERENCES person(perID),
    CONSTRAINT fk3 FOREIGN KEY (moduleID) REFERENCES module(moduleID)
);

INSERT INTO instructor VALUES
('instructor1');