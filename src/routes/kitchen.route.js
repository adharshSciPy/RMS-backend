import Router from "express"
import { registerKitchen, loginKitchen } from "../controllers/kitchen.controller.js"

const kitchenRoute = Router()

kitchenRoute.route('/register').post(registerKitchen)
kitchenRoute.route('/login').post(loginKitchen)

export default kitchenRoute