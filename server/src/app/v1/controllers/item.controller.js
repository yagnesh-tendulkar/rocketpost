import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} from '../models/item.model.js';
// Create an item
export const createNewItem = async (req, res) => {
    const result = await createItem(req.body);
    res.status(result.statusCode).json(result);
}
// Get all items
export const getItemData = async (req, res) => {
    const result = await getItems();
    res.status(result.statusCode).json(result);
}
export const getItemDataById = async (req, res) => {
    const result = await getItemById(req.params.id);
    res.status(result.statusCode).json(result);
}
// Update an item
export const updateItemData = async (req, res) => {
    const result = await updateItem(req.params.id, req.body);
    res.status(result.statusCode).json(result);
}
// Delete an item
export const deleteItemData = async (req, res) => {
    const result = await deleteItem(req.params.id);
    res.status(result.statusCode).json(result);
}