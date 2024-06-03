import Router from "express"
import { registerKitchen, loginKitchen, blockOrUnblockKitchen } from "../controllers/kitchen.controller.js"

const kitchenRoute = Router()

kitchenRoute.route('/register/:companyId').post(registerKitchen)
kitchenRoute.route('/login').post(loginKitchen)

//kitchen management routes
kitchenRoute.route('/:kitchenId/block').patch(blockOrUnblockKitchen)

export default kitchenRoute