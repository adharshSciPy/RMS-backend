import Router from "express"
import { registerOutlet, loginOutlet } from "../controllers/outlet.controller.js"

const outletRoute = Router()

outletRoute.route('/register/:companyId/:kitchenId').post(registerOutlet)
outletRoute.route('/login').post(loginOutlet)

export default outletRoute