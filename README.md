
# RMS EXPRESS SERVER

Express server with REST APIs to manage super admin and business. Business consist of two major roles Kitchen and Outlet. Each Outlet is derrived from a Kitchen.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`MONGODB_URI=mongodb+srv://adharshscipy:adharshscipy@cluster0.u51rll2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

`ACCESS_TOKEN_SECRET=PKACT2024SCIPYADHARSH`

`CORS_ORIGIN=http://localhost:5173`

`ACCESS_TOKEN_EXPIRY='1h'`

`PORT=8000`

## Installation and running dev

Clone the project

```bash
  git clone https://github.com/adharshSciPy/RMS-backend.git
```

Go to the project directory

```bash
 cd rms-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## npm packages used in project

| npm package             | Reference                                                                |
| ----------------- | ------------------------------------------------------------------ |
| express | https://www.npmjs.com/package/express |
| mongoose | https://www.npmjs.com/package/mongoose |
| nodemon | https://www.npmjs.com/package/nodemon |
| express-rate-limit |https://www.npmjs.com/package/express-rate-limit |
| dotenv | https://www.npmjs.com/package/dotenv |
| cors | https://www.npmjs.com/package/cors |
| bcryptjs | https://www.npmjs.com/package/bcryptjs |
| jsonwebtoken | https://www.npmjs.com/package/jsonwebtoken |

## Mongo Database Models

- admins
- companies
- kitchens
- outlets
- menus
- orders
- transacitons


## API Documentation(Based on Resource)

#### Super Administrator (schema: admins)

###### Admin Registration

```http
POST /api/v1/admin/register
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `name, email, password` | `null` | Creating super admin with all level of access to the system |

###### Admin Login

```http
  POST /api/v1/admin/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email, password`      | `null` | Login api of super admin with credentials |

-------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------


#### Company (Business) (schema: companies)

###### Company Registration

```http
POST /api/v1/company/register
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `companyName, email, password` | `null` | Creating a new compnay(business) by admin  |

###### Company Login

```http
POST /api/v1/admin/login
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `email, password` | `null` | Login api of Comapny with credentials |

###### Company Block Mangement

```http
PATCH /api/v1/company/companyId/block
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `isBloked` | `companyId: number` | Company's block management api for super admin |

###### List all Companies

```http
GET /api/v1/company/companies
```

| Body | Query   | Description                |
| :-------- | :------- | :------------------------- |
|  |  `page, limit` | List all companies with its kitchen and outlets details(Paginated API) |


-------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------


#### Kitchen (schema: kitchens)

###### Kitchen Registration

```http
POST /api/v1/kitchen/register/:companyId
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `kitchenName, email, password` | `companyId` | Creating a new kitchen under a company  |

###### Kitchen Login

```http
POST /api/v1/kitchen/login
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `email, password` | `null` | Login api of kitchen with credentials  |

######  Kitchen Login

```http
PATCH /api/v1/kitchen/:kitchenId/block
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `isBlocked` | `kitchenId` | Kitchen's block management api for super admin  |

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------


#### Outlet (schema: outlets)

######  Outlet Registration

```http
POST /api/v1/outlet/register/:companyId/:kitchenId
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `outletName, email, password` | `kitchenId, companyId` |Creating a new outlet under a company's kitchen  |


######  Outlet Login

```http
POST /api/v1/outlet/login
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `email, password` | `null` | Login api of Outlet with credentials  |


######  Outlet Blocking

```http
PATCH /api/v1/outlet/:outletId/block
```

| Body | Params   | Description                |
| :-------- | :------- | :------------------------- |
| `isBlocked` | `outletId` | Outlet's block management api for super admin  |




