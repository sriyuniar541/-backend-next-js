-- Active: 1669856751279@@localhost@5432@postgres@public
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR, 
    ingredients VARCHAR ,
    vidio VARCHAR,
    photo VARCHAR,
    description VARCHAR,
    comment_id VARCHAR
);

ALTER TABLE recipe DROP COLUMN comment_id;
ALTER TABLE recipe ADD COLUMN comment_id INT;

AlTER TABLE recipe add foreign key (comment_id) REFERENCES comment(id);

 INSERT INTO recipe (id,title,ingredients,vidio,photo,description,comment_id) VALUES (1,'tes','tes','vidio','phot','description','1');

CREATE TABLE  comment (
    id SERIAL PRIMARY KEY,
    comment VARCHAR,
    user_recipe_id VARCHAR 
);

ALTER TABLE comment ADD COLUMN user_recipe_id INT;
AlTER TABLE comment add foreign key (user_recipe_id) REFERENCES user_recipe(id);

INSERT INTO comment (id,comment,user_recipe) VALUES (1,'tes','1');


CREATE TABLE user_recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    password VARCHAR,
    email VARCHAR,
    phone_number VARCHAR,
    photo VARCHAR

);





