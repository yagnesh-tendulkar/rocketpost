import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../models/user.model.js';
// Create an item
export const createNewUser = async (req, res) => {
    const result = await createUser(req.body);
    res.status(result.statusCode).json(result);
}
// Get all items
export const getUserData = async (req, res) => {
    const result = await getUsers();
    res.status(result.statusCode).json(result);
}
export const getUserDataById = async (req, res) => {
    const result = await getUserById(req.params.id);
    res.status(result.statusCode).json(result);
}
// Update an item
export const updateUserData = async (req, res) => {
    const result = await updateUser(req.params.id, req.body);
    res.status(result.statusCode).json(result);
}
// Delete an item
export const deleteUserData = async (req, res) => {
    const result = await deleteUser(req.params.id);
    res.status(result.statusCode).json(result);
}