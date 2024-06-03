import { Company } from "../models/company.model.js";
import { passwordValidator } from "../utils/passwordvalidator.util.js";

// @POST
// company/register
// desc: Creating a new compnay(business) by admin
const registerCompany = async (req, res) => {
    const { companyName, email, password } = req.body

    try {
        // sanitiasing inputs
        const isEmptyFields = [companyName, email, password].some((field) => field?.trim() === "")
        if (isEmptyFields) {
            return res.status(401).json({ message: "All fields are required", })
        }

        //validate password
        const isValidPassword = passwordValidator(password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number", })
        }

        //prevent duplicate accounts
        const isAlreadyExistingCompany = await Company.findOne({ email: email });
        if (isAlreadyExistingCompany) {
            return res.status(409).json({ message: 'Company Email is already in use' });
        }

        //company creation
        const company = await Company.create({ companyName, email, password });
        const createdCompany = await Company.findOne({ _id: company._id }).select('-password');

        if (!createdCompany) {
            return res.status(500).json({ message: 'Company registration failed' });
        }

        return res.status(201).json({ message: 'Company registration succesfull', data: createdCompany });

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

// @POST
// company/login
// desc: Login api of Comapny with credentials
const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        // sanitiasing inputs
        const isEmptyFields = [email, password].some((field) => field?.trim() === "");
        if (isEmptyFields) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //finding company and validating
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(404).json({ message: "Company doesn't exist" });
        }

        // verify password 
        const isPasswordCorrect = await company.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        //generate access token
        const accessToken = await company.generateAccessToken();

        return res.status(200).json({ message: 'Compnay Validation Succesfull', token: accessToken })
    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
};

// @PATCH
// company/:companyId/block
// desc: Company's block management api for super admin
const blockOrUnblockCompany = async (req, res) => {

    const { companyId } = req.params
    const { isBlocked } = req.body

    try {
        //sanitizing inputs
        if (isBlocked === undefined) {
            return res.status(400).json({ message: "isBlocked field is missing" });
        }

        const company = await Company.findById(companyId)

        //validating company
        if (!company) {
            return res.status(404).json({ message: "Company doesn't exist" });
        }

        //updating company restriction as isBlock's value
        company.isBlocked = isBlocked;
        await company.save();

        return res.status(200).json({ message: `${company.companyName} ${isBlocked ? 'Blocked' : 'Unblocked'} Succesfully` })

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

// @GET
// company/companies?skip?limit
// desc: List all companies with its kitchen and outlets details(Paginated API)
const listAllCompanies = async (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    // skip logic
    const skip = (page - 1) * limit;

    try {

        // pagination logic
        const totalCompaniesCount = await Company.countDocuments();
        const totalPages = Math.ceil(totalCompaniesCount / limit);
        const hasNextPage = page < totalPages;

        //aggregrate companies details
        const companies = await Company.aggregate([
            {
                $lookup: {
                    from: "kitchens",
                    localField: "_id",
                    foreignField: "companyId",
                    as: "kitchens"
                }
            },
            {
                $lookup: {
                    from: "outlets",
                    localField: "_id",
                    foreignField: "companyId",
                    as: "outlets"
                }
            },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    email: 1,
                    isBlocked: 1,
                    kitchens: {
                        _id: 1,
                        kitchenName: 1,
                        email: 1
                    },
                    outlets: {
                        _id: 1,
                        outletName: 1,
                        email: 1
                    }
                }
            },
            { $skip: parseInt(skip) },
            { $limit: parseInt(limit) }
        ])

        if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }

        res.status(200).json({ message: 'Companies found succesfull', data: companies })

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }

}

export { registerCompany, loginCompany, blockOrUnblockCompany, listAllCompanies }