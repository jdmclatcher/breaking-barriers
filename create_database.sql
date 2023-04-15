-- MAIN TABLE TO HOLD ALL USERS OF THE SYSTEM --
DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person(
    perID VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (perID)
);

INSERT INTO person VALUES
('admin1', 'admin1'),
('admin2', 'admin2'),
('instructor1', 'instructor1');

-- RELATIONAL TABLE SETUP FOR ADMINISTRATORS --
DROP TABLE IF EXISTS administrator CASCADE;
CREATE TABLE administrator (
    perID VARCHAR(100) NOT NULL,
    PRIMARY KEY (perID),
    CONSTRAINT fk1 FOREIGN KEY (perID) REFERENCES person(perID)
);

INSERT INTO administrator VALUES
('admin1'),
('admin2');

-- COURSE MODULE TABLE --
DROP TABLE IF EXISTS module CASCADE;
CREATE TABLE module (
    moduleID SERIAL PRIMARY KEY,
    moduleTitle VARCHAR(100) NOT NULL,
    moduleDescription VARCHAR(500)
);

INSERT INTO module (moduleTitle, moduleDescription) VALUES
('The First Module', 'Here is a description of the first module.');

-- CREATE INSTRUCTOR TABLE --
DROP TABLE IF EXISTS instructor CASCADE;
CREATE TABLE instructor (
    perID VARCHAR(100) NOT NULL,
    moduleID INTEGER,
    PRIMARY KEY (perID),
    CONSTRAINT fk2 FOREIGN KEY (perID) REFERENCES person(perID),
    CONSTRAINT fk3 FOREIGN KEY (moduleID) REFERENCES module(moduleID)
);

INSERT INTO instructor VALUES
('instructor1');