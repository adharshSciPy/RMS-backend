
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

