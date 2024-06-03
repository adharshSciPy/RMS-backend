import Router from "express"
import { registerOutlet, loginOutlet, blockOrUnblockOutlet } from "../controllers/outlet.controller.js"

const outletRoute = Router()

//outlet auth routes
outletRoute.route('/register/:companyId/:kitchenId').post(registerOutlet)
outletRoute.route('/login').post(loginOutlet)

//outlet management routes
outletRoute.route('/:outletId/block').patch(blockOrUnblockOutlet)

export default outletRoute