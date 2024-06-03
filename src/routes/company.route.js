import Router from "express"
import { loginCompany, registerCompany, blockOrUnblockCompany, listAllCompanies } from "../controllers/company.controller.js"

const companyRoute = Router()

//company auth routes
companyRoute.route('/register').post(registerCompany)
companyRoute.route('/login').post(loginCompany)

//company CRUD routes
companyRoute.route('/companies').get(listAllCompanies)

//company management routes
companyRoute.route('/:companyId/block').patch(blockOrUnblockCompany)

export default companyRoute