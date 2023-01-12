-- Active: 1669856751279@@localhost@5432@postgres@public
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR, 
    ingredients VARCHAR ,
    vidio VARCHAR,
    photo VARCHAR,
    description VARCHAR, 
);

ALTER TABLE recipe ADD COLUMN user_recipe_id VARCHAR REFERENCES user_recipe(id);
SELECT comment.id,comment.comment, user_recipe.id as user_recipe FROM comment INNER JOIN user_recipe ON comment.user_recipe_id = user_recipe.id;
INSERT INTO comment(id,user_recipe_id,comment) VALUES('5','1','ini contoh');

SELECT recipe.id,recipe.title,recipe.ingredients,recipe.vidio,recipe.photo,recipe.description,comment.comment as comment,user_recipe.name as user_recipe FROM recipe INNER JOIN comment ON recipe.comment_id = comment.id INNER JOIN user_recipe ON recipe.user_recipe_id = user_recipe.id;


ALTER TABLE recipe DROP COLUMN comment_id;
ALTER TABLE recipe ADD COLUMN comment_id INT;

AlTER TABLE recipe add foreign key (comment_id) REFERENCES comment(id);

 INSERT INTO recipe (id,title,ingredients,vidio,photo,description,comment_id) VALUES (1,'tes','tes','vidio','phot','description','1');

CREATE TABLE  comment (
    id VARCHAR PRIMARY KEY,
    comment VARCHAR,
    user_recipe_id VARCHAR REFERENCES user_recipe(id)
);

CREATE TABLE  commentTes (
    id VARCHAR PRIMARY KEY,
    comment VARCHAR,
    user_recipe_id VARCHAR 
);

SELECT comment.id,comment.comment, user_recipe.id as user_recipe FROM comment INNER JOIN user_recipe ON comment.user_recipe_id = user_recipe.id;


ALTER TABLE comment ADD COLUMN user_recipe_id VARCHAR REFERENCES user_recipe(id);

SELECT transactions.email,products.name as products_name,
transactions.amount,products.price,transactions.total,
payment_status.name as status FROM transactions JOIN products 
ON transactions.products_id = products.id JOIN payment_status
ON transactions.status = payment_status.id; 


INSERT INTO comment (id,comment,user_recipe) VALUES (1,'tes','1');


CREATE TABLE user_recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    password VARCHAR,
    email VARCHAR,
    phone_number VARCHAR,
    photo VARCHAR

);


ALTER TABLE user_recipe ADD COLUMN comment_id VARCHAR REFERENCES comment(id);


SELECT user_recipe.id,user_recipe.name,user_recipe.password,user_recipe.email,user_recipe.phone_number,user_recipe.photo,comment.comment as comment FROM user_recipe INNER JOIN comment ON user_recipe.comment_id = comment.id;
