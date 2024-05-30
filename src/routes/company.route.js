import Router from "express"
import { loginCompany, registerCompany } from "../controllers/company.controller.js"

const companyRoute = Router()

companyRoute.route('/register').post(registerCompany)
companyRoute.route('/login').post(loginCompany)

export default companyRoute