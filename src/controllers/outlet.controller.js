import { Outlet } from "../models/outlet.model.js"
import { Kitchen } from "../models/kitchen.model.js"
import { Company } from "../models/company.model.js"
import { passwordValidator } from "../utils/passwordvalidator.util.js"

// @POST
// outlet/register/:companyId/:kitchenId
// desc: Creating a new outlet under a company's kitchen
const registerOutlet = async (req, res) => {
    const { companyId, kitchenId } = req.params
    const { outletName, email, password } = req.body

    try {
        // sanitiasing inputs
        if (!companyId && !kitchenId) {
            return res.status(401).json({ message: "Company Id or Kitchen Id is missing" })
        }

        const isEmptyFields = [outletName, email, password].some((field) => field?.trim() === "")
        if (isEmptyFields) {
            return res.status(401).json({ message: "All fields are required", })
        }

        //validate password
        const isValidPassword = passwordValidator(password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number", })
        }

        //prevent duplicate accounts
        const isAlreadyExistingOutlet = await Outlet.findOne({ email: email });
        if (isAlreadyExistingOutlet) {
            return res.status(409).json({ message: 'Outlet Email is already in use' });
        }

        //verify kitchen and company
        const kitchen = await Kitchen.findOne({ _id: kitchenId })
        const company = await Company.findOne({ _id: companyId })
        if (!kitchen && !company) {
            return res.status(404).json({ message: "Kitchen or Company doesn't exist" });
        }

        //outlet creation
        const outlet = await Outlet.create({ outletName, email, password, companyId, kitchenId });

        //created outlet id pushing to kitchen's outletIds array and company's outletIds array
        kitchen.outletIds.push(outlet._id)
        company.outletIds.push(outlet._id)
        await kitchen.save()
        await company.save()

        const createdOutlet = await Outlet.findOne({ _id: outlet._id }).select('-password -ordersId -kitchenId -createdAt -updatedAt -__v');

        if (!createdOutlet) {
            return res.status(500).json({ message: 'Outlet registration failed' });
        }

        return res.status(201).json({ message: 'Outlet registration succesfull', data: createdOutlet });

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

// @POST
// outlet/login
// desc: Login api of Outlet with credentials
const loginOutlet = async (req, res) => {
    const { email, password } = req.body;

    try {
        // sanitiasing inputs
        const isEmptyFields = [email, password].some((field) => field?.trim() === "");
        if (isEmptyFields) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //finding outlet and validating
        const outlet = await Outlet.findOne({ email });
        if (!outlet) {
            return res.status(404).json({ message: "Outlet doesn't exist" });
        }

        // verify password 
        const isPasswordCorrect = await outlet.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        //generate access token
        const accessToken = await outlet.generateAccessToken();

        return res.status(200).json({ message: 'Outlet Validation Succesfull', token: accessToken })
    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
};

// @PATCH
// outlet/:outletId/block
// desc: Outlet's block management api for super admin
const blockOrUnblockOutlet = async (req, res) => {

    const { outletId } = req.params
    const { isBlocked } = req.body

    try {
        //sanitizing inputs
        if (isBlocked === undefined) {
            return res.status(400).json({ message: "isBlocked field is missing" });
        }

        const outlet = await Outlet.findById(outletId)

        //validating company
        if (!outlet) {
            return res.status(404).json({ message: "Outlet doesn't exist" });
        }

        //updating company restriction as isBlock's value
        outlet.isBlocked = isBlocked;
        await outlet.save();

        return res.status(200).json({ message: `${outlet.outletName} ${isBlocked ? 'Blocked' : 'Unblocked'} Succesfully` })

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

export { registerOutlet, loginOutlet, blockOrUnblockOutlet }
