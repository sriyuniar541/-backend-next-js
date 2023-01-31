<br />
<p align="center">

  <h3 align="center">RECIPE</h3>
  <p align="center">
    <image align="center" width="200" src='https://res.cloudinary.com/dxrsjyu6o/image/upload/v1675087793/recipe/bg2_tabsqa.png' />
  </p>

  <p align="center">
    <br />
    <a href="https://github.com/sriyuniar541/Apk-Recipe-be"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="===link deploy here =====">View Demo</a>
  </p>
</p>



## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Run Locally](https://github.com/helmipradita/be-telegram/edit/main/README.md#run-locally)
* [Demo](https://github.com/helmipradita/be-telegram/edit/main/README.md#demo)
  *  [x] [API Reference - Auth](#api-reference---auth)
  *  [x] [API Reference - Recipe](#api-reference---recipe)
  *  [x] [API Reference - Comment](#api-reference---comment)
  *  [x] [API Reference - Saverecipe](#api-reference---saverecipe)
  *  [x] [API Reference - Likerecipe](#api-reference---likerecipe)
* [Related Project](#related-project)
* [Contact](#contact)

## About The Project

Application for chat
## Run Locally

Clone the project

```bash
  git clone https://github.com/sriyuniar541/Apk-Telegram-socket-io-Be
```

Go to the project directory

```bash
  cd Apk-Telegram-socket-io-Be
```

Install dependencies

```bash
  npm install
```

Setup .env copy from .env.example

```bash
  PORT=
  HOST=
  JWT_KEY=
  PG_CONNECT=

  MAIL_USERNAME=
  MAIL_PASSWORD=
  OAUTH_CLIENTID=
  OAUTH_CLIENT_SECRET=
  OAUTH_REFRESH_TOKEN=
```

Start the server

```bash
  npm run start
```


## API Reference - Auth

<details>
<summary>Show</summary>
<br>

#### Register 

```
  POST /users/register
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `name`    | `string` | **Required**. name |
| `password`    | `string` | **Required**. password  |
| `email` | `string` | **Required**. with format email          |
| `phone_number` | `string` | **Required**. phone_number          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "otp": "452167"
  },
  "message": "register success please check your email to verif"
}
```

#### Login

```
  POST /users/login
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "c13a880c-af29-4a55-b206-4756121c8ca0",
    "name": "sri keren",
    "email": "sri111@gmail.com",
    "phone_number": "undefined",
    "photo": "nulll",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxM2E4ODBjLWFmMjktNGE1NS1iMjA2LTQ3NTYxMjFjOGNhMCIsImVtYWlsIjoic3JpMTExQGdtYWlsLmNvbSIsImlhdCI6MTY3NTE2MDg0MCwiZXhwIjoxNjc1MTY0NDQwfQ.vo0ubhyhseiy0A0c7La_nn5krDH2IlHm914phodWQrE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxM2E4ODBjLWFmMjktNGE1NS1iMjA2LTQ3NTYxMjFjOGNhMCIsImVtYWlsIjoic3JpMTExQGdtYWlsLmNvbSIsImlhdCI6MTY3NTE2MDg0MCwiZXhwIjoxNjc1MjQ3MjQwfQ.xxPofcahdqIGHiEQgFi9RIeo4YhCHhIANIeRiijDWhk"
  },
  "message": "login success"
}
```

#### Verification

```
  POST /users/email/verif
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `otp` | `string` | **Required**. otp          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {},
  "message": "email succes"
}
```

#### Edit profile 

```
  PUT /users/update/:id
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. req.params.id     |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `password`     | `string` | **Required**. password     |
| `photo`    | `file`   | **Required**. photo    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "update users success"
}
```

#### Get all users

```
  GET /users
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "6599d3dd-2e28-4c06-8e60-82d00d985982",
      "name": "sri yuniar",
      "password": "$2a$10$nmt9/lhyXt1Jbd.UV4mwUOrWSMZ71k3B9Q4iKyRBCe7DNTOzs.pCO",
      "email": "sriyiii@gmail.com",
      "phone_number": "12345",
      "photo": "http://localhost:4001/img/photo-1674047130618.png",
      "verif": "1",
      "otp": "332274"
    },
    {
      "id": "c13a880c-af29-4a55-b206-4756121c8ca0",
      "name": "sri keren",
      "password": "$2a$10$hm3lILtvbP9veTwKC5fLgek/Jg7SlRcHBgmWTgYtjt81Mkep6fUa6",
      "email": "sri111@gmail.com",
      "phone_number": "undefined",
      "photo": "http://localhost:4001/img/photo-1675948140614.png",
      "verif": "1",
      "otp": "452167"
    },
    {
      "id": "34114eef-6ff5-446e-b185-bdb2ff896edc",
      "name": "sri yuniar",
      "password": "$2a$10$a/syo4GT66FPRjcfGW73c.BtZcTo6uuwA3wmnSkx5rtssOQy9x3hm",
      "email": "srivviiyuuu@gmail.com",
      "phone_number": "12345",
      "photo": "http://localhost:4001/img/photo-1673971542760.png",
      "verif": "1",
      "otp": "305813"
    }
  ],
  "message": "get users success"
}
```

#### Get users by id

```
  GET /users/:id
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. req.params.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "6599d3dd-2e28-4c06-8e60-82d00d985982",
      "name": "sri yuniar",
      "password": "$2a$10$nmt9/lhyXt1Jbd.UV4mwUOrWSMZ71k3B9Q4iKyRBCe7DNTOzs.pCO",
      "email": "sriyiii@gmail.com",
      "phone_number": "12345",
      "photo": "http://localhost:4001/img/photo-1674047130618.png",
      "verif": "1",
      "otp": "332274"
    }
  ],
  "message": "get users success"
}
```

</details>

## API Reference - Recipe

<details>
<summary>Show</summary>
<br>

#### Insert Recipe

```
  POST /recipe
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form 

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id    |
| `name`     | `string` | **Required**. name     |
| `photo`     | `string` | **Required**. photo     |
| `id_user`     | `string` | **Required**. id_user from users.id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "insert data sukses"
}

```

#### Get all recipe 

```
  GET /recipe
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "86a26f17-9864-4eb1-8c5a-7f26aa3e9e4b",
      "title": "",
      "ingredients": "ingredients",
      "vidio": "vidio",
      "photo": "http://localhost:4001/img/photo-1675693399391.png",
      "description": "description",
      "user_recipe_id": "c13a880c-af29-4a55-b206-4756121c8ca0"
    },
    {
      "id": "3",
      "title": "kue",
      "ingredients": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. ",
      "vidio": "vidio",
      "photo": "http://localhost:4001/img/photo-1670689445324.png",
      "description": "Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!",
      "user_recipe_id": null
    },
    {
      "id": "2bfd48c7-c0a1-49e9-a0fd-1611c25309c2",
      "title": "gulai",
      "ingredients": "daging,ayam",
      "vidio": "https://www.youtube.com/watch?v=Mi72fOuiwA0",
      "photo": "http://localhost:4001/img/photo-1674078053234.png",
      "description": "description",
      "user_recipe_id": "ff80ccc0-2503-493b-b501-2ff84cb4c7d9"
    },
    {
      "id": "2",
      "title": "ikan",
      "ingredients": "tes saja",
      "vidio": "vidio",
      "photo": "http://localhost:4001/img/photo-1670263225746.png",
      "description": "Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!",
      "user_recipe_id": null
    },
    {
      "id": "13613918-bed8-418a-930b-57dd1e227400",
      "title": "roti",
      "ingredients": "tepung, telur",
      "vidio": "https://www.youtube.com/watch?v=Mi72fOuiwA0",
      "photo": "http://localhost:4001/img/photo-1673581451955.png",
      "description": "description",
      "user_recipe_id": "6aca3c78-9d1d-4f84-88fc-4285dc5d0d3a"
    }
  ],
  "message": "get data sukses"
}
```

#### Get recipe by id

```
  GET /recipe/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. req.params.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "86a26f17-9864-4eb1-8c5a-7f26aa3e9e4b",
      "title": "",
      "ingredients": "ingredients",
      "vidio": "vidio",
      "photo": "http://localhost:4001/img/photo-1675693399391.png",
      "description": "description"
    }
  ],
  "message": "get data sukses"
}

```
#### Get recipe by user_id

```
  GET /recipe/user
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params 

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `user_id`     | `string` | **Required**. req.payload.id    |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "86a26f17-9864-4eb1-8c5a-7f26aa3e9e4b",
      "title": "",
      "ingredients": "ingredients",
      "vidio": "vidio",
      "photo": "http://localhost:4001/img/photo-1675693399391.png",
      "description": "description",
      "user_recipe_id": "c13a880c-af29-4a55-b206-4756121c8ca0"
    }
  ],
  "message": "get data sukses"
}

```

#### Delete recipe

```
  DELETE /recipe/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from skill_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "delete grups success"
}

```


</details>

## API Reference - Comment

<details>
<summary>Show</summary>
<br>

#### Insert comment

```
  POST /comment
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |


Field body form  

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id    |
| `comment`     | `string` | **Required**. comment     |
| `user_recipe_id`     | `string` | **Required**. from user.id     |
| `recipe_id`     | `string` | **Required**.  from recipe.id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "insert data sukses"
}

```

#### Get all comment 

```
  GET /comment
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "588ecaa5-7783-4db6-9d79-94ae178b0feb",
      "comment": "terima kasih recepinya",
      "user_recipe": "sri yuniar",
      "user_recipe_photo": "http://localhost:4001/img/photo-1673546389649.png",
      "recipe_id": "4"
    },
    {
      "id": "1db8aa86-56bc-4ad8-93e8-443c5c4f7674",
      "comment": "hai lagi",
      "user_recipe": "sri yuniar",
      "user_recipe_photo": "http://localhost:4001/img/photo-1673728662064.png",
      "recipe_id": "6"
    },
    {
      "id": "320cebbb-a904-4415-8f9a-2e6584447932",
      "comment": "hai",
      "user_recipe": "yuyun",
      "user_recipe_photo": "http://localhost:4001/img/photo-1673623554076.png",
      "recipe_id": "6"
    },
    {
      "id": "22a28e87-bdce-4b6e-9f8b-543bbb9c06d7",
      "comment": "hallo",
      "user_recipe": "yuyun",
      "user_recipe_photo": "http://localhost:4001/img/photo-1673623554076.png",
      "recipe_id": "3a718973-3508-4850-bfe6-4eb467005627"
    }
  ],
  "message": "get data sukses dari comment"
}
```

#### Get comment by recipe_id

```
  GET /comment/:recipe_id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `recipe_id`     | `string` | **Required**. req.params.recipe_id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "5056edd4-dff9-44ff-b2cb-9e67e8d1e891",
      "comment": "salam",
      "user_recipe": "yuyun",
      "user_recipe_photo": "http://localhost:4001/img/photo-1673623554076.png",
      "recipe_id": "5"
    }
  ],
  "message": "get data sukses dari comment"
}

```

</details>

## API Reference - Savedrecipe

<details>
<summary>Show</summary>
<br>

#### Insert Savedrecipe

```
  POST /savedRecipe
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form 

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id    |
| `recipe_id`     | `string` | **Required**. from recipe.id     |
| `user_recipe_id`     | `string` | **Required**. from user_recipe.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "insert data sukses"
}

```


#### Get savedrecipe by user_id

```
  GET /savedRecipe/
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `user_id`     | `string` | **Required**. req.payload.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "690613c4-4966-4275-b803-e5fcc1064809",
      "recipe_id": "3",
      "recipe_photo": "http://localhost:4001/img/photo-1670689445324.png",
      "recipe_name": "kue",
      "user_recipe_id": "887e3240-1614-4a67-bba0-dd0ff3af95e3"
    }
  ],
  "message": "get data sukses dari saved"
}

```
#### Delete savedecipe

```
  DELETE /savedRecipe/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from skill_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "delete data success"
}

```

</details>

## API Reference - Likerecipe

<details>
<summary>Show</summary>
<br>

#### Insert Likerecipe

```
  POST /likeRecipe
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form 

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id    |
| `recipe_id`     | `string` | **Required**. from recipe.id     |
| `user_recipe_id`     | `string` | **Required**. from user_recipe.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "insert data sukses"
}

```


#### Get likerecipe by user_id

```
  GET /likeRecipe
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `user_id`     | `string` | **Required**. req.payload.id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "690613c4-4966-4275-b803-e5fcc1064809",
      "recipe_id": "3",
      "recipe_photo": "http://localhost:4001/img/photo-1670689445324.png",
      "recipe_name": "kue",
      "user_recipe_id": "887e3240-1614-4a67-bba0-dd0ff3af95e3"
    }
  ],
  "message": "get data sukses dari liked"
}

```
#### Delete likerecipe

```
  DELETE /likeRecipe/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from skill_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "message": "delete data success"
}

```

</details>



## Related Project
* [`Backend Project Telegram `](https://github.com/sriyuniar541/Apk-Telegram-socket-io-Be)

## Contact
  * Sri Yuniar [@sriyuniar541](https://github.com/sriyuniar541)
