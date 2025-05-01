CREATE DATABASE gestionedt;

CREATE TABLE matiere (
    idmatiere SERIAL PRIMARY KEY, nommatiere VARCHAR(50)
);

CREATE TABLE salle (
    idsalle SERIAL PRIMARY KEY,
    nomsalle VARCHAR(10)
);

CREATE TABLE professeur (
    idprofesseur SERIAL PRIMARY KEY,
    nomprofesseur VARCHAR(50),
    prenomsprofesseur VARCHAR(50),
    gradeprofesseur VARCHAR(50)
);

CREATE TABLE niveau(
    idniveau SERIAL PRIMARY KEY,
    nomniveau
);

CREATE TABLE emploidutemps (
    idemploi SERIAL PRIMARY KEY, idmatiere INT REFERENCES matiere(idmatiere) ON DELETE CASCADE ON UPDATE CASCADE,
    idsalle INT REFERENCES salle(idsalle) ON DELETE CASCADE ON UPDATE CASCADE, 
    idniveau INT REFERENCES niveau(idniveau) ON DELETE CASCADE ON UPDATE CASCADE,
    idprofesseur INT REFERENCES professeur(idprofesseur) ON DELETE CASCADE ON UPDATE CASCADE, date DATE, heure VARCHAR(10)
);
