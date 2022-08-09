--This is where you will put your sql tables
--Common structure 
--DROP TABLE IF EXISTS will remove any data 
    --in a same named table on your postgress

--CREATE TABLE *tableName* ( 
--id BIGINT GENERATED AS IDENTITY PRIMARY KEY, (BIGINT is a string)
--*tableItem* VARCHAR/TEXT/INT/TIMESTAMPTZ/DATE/BOOLEAN any of these
-- descriptors.  
--NOT NULL will prevent empty table data
--UNIQUE will prevent same strings from being used
--DEFAULT NOW() will give you the timestamp of when its created
--FOREIGN KEY *tableItem* REFERENCES *table*(*tableItem*)    
--);

--INSERT INTO *tableName* (*tableItems* you want to use) 
--VALUES (*mimic table items*);

DROP TABLE IF EXISTS monsters;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);


CREATE TABLE monsters (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    user_id BIGINT NOT NULL, 
    name VARCHAR NOT NULL,
    species VARCHAR NOT NULL,
    power_level INT NOT NULL DEFAULT(10),
    type VARCHAR NOT NULL, 
    sub_type VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

