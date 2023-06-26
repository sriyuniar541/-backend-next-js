
==========data baru==================

CREATE TABLE user_recipe (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR,
    photo VARCHAR,
    verif VARCHAR,
    otp VARCHAR
);

CREATE TABLE recipe (
    id VARCHAR PRIMARY KEY,
    title VARCHAR, 
    ingredients VARCHAR ,
    vidio VARCHAR,
    photo VARCHAR,
    description VARCHAR, 
    user_recipe_id VARCHAR REFERENCES user_recipe(id)
);
CREATE TABLE  comment (
    id VARCHAR PRIMARY KEY,
    comment VARCHAR,
    user_recipe_id VARCHAR REFERENCES user_recipe(id),
    recipe_id VARCHAR REFERENCES recipe(id)
);

CREATE TABLE  savedrecipe (
    id VARCHAR PRIMARY KEY,
    recipe_id VARCHAR REFERENCES recipe(id),
    user_recipe_id VARCHAR REFERENCES user_recipe(id)
);
CREATE TABLE  likerecipe (
    id VARCHAR PRIMARY KEY,
    recipe_id VARCHAR REFERENCES recipe(id),
    user_recipe_id VARCHAR REFERENCES user_recipe(id)
);