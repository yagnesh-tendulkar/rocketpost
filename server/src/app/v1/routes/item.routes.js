import express from "express";
import { createNewItem, deleteItemData, pinCodeData, updateItemData, getItemDataById, getItemData } from "../controllers/item.controller.js";

const router = express.Router();

router.route('/').post(createNewItem);
router.route('/').get(getItemData);

router.route('/:code').get(pinCodeData);
router.route('/:id').get(getItemDataById);
router.route('/:id').put(updateItemData);
router.route('/:id').delete(deleteItemData);
export default router;