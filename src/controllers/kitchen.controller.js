import { Kitchen } from "../models/kitchen.model.js";
import { passwordValidator } from "../utils/passwordvalidator.util.js";

const registerKitchen = async (req, res) => {
    const { companyId } = req.params
    const { kitchenName, email, password } = req.body

    try {
        // sanitiasing inputs
        if (!companyId) {
            return res.status(401).json({ message: "Company Id missing" })
        }

        const isEmptyFields = [kitchenName, email, password].some((field) => field?.trim() === "")
        if (isEmptyFields) {
            return res.status(401).json({ message: "All fields are required", })
        }

        //validate password
        const isValidPassword = passwordValidator(password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number", })
        }

        //prevent duplicate accounts
        const isAlreadyExistingKitchen = await Kitchen.findOne({ email: email });
        if (isAlreadyExistingKitchen) {
            return res.status(409).json({ message: 'Kitchen Email is already in use' });
        }

        //kitchen creation
        const kitchen = await Kitchen.create({ kitchenName, email, password, companyId });
        const createdKitchen = await Kitchen.findOne({ _id: kitchen._id }).select('-password -menuId -outletIds -companyId');

        if (!createdKitchen) {
            return res.status(500).json({ message: 'Kitchen registration failed' });
        }

        return res.status(201).json({ message: 'Kitchen registration succesfull', data: createdKitchen });

    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
}

const loginKitchen = async (req, res) => {
    const { email, password } = req.body;

    try {
        // sanitiasing inputs
        const isEmptyFields = [email, password].some((field) => field?.trim() === "");
        if (isEmptyFields) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //finding kitchen and validating
        const kitchen = await Kitchen.findOne({ email });
        if (!kitchen) {
            return res.status(404).json({ message: "kitchen doesn't exist" });
        }

        // verify password 
        const isPasswordCorrect = await kitchen.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        //generate access token
        const accessToken = await kitchen.generateAccessToken();

        return res.status(200).json({ message: 'Kitchen Validation Succesfull', token: accessToken })
    }
    catch (err) {
        return res.status(500).json({ message: `Internal Server due to ${err.message}` });
    }
};

export { registerKitchen, loginKitchen }