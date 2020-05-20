--Up
CREATE TABLE Person(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE Ticket(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title text ,
    place TEXT,
    artist TEXT,
    descr TEXT,
    pathToFile text,
    ownerId integer REFERENCES Person(id)
);


-- Down
DROP TABLE Ticket;
DROP TABLE Person;