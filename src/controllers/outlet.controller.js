import { Outlet } from "../models/outlet.model.js"
import { passwordValidator } from "../utils/passwordvalidator.util.js"

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

        //outlet creation
        const outlet = await Outlet.create({ outletName, email, password, companyId });
        const createdOutlet = await Outlet.findOne({ _id: outlet._id }).select('-password -ordersId -kitchenId');

        if (!createdOutlet) {
            return res.status(500).json({ message: 'Outlet registration failed' });
        }

        return res.status(201).json({ message: 'Outlet registration succesfull', data: createdOutlet });

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

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

export { registerOutlet, loginOutlet }
