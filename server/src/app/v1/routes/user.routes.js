import express from "express";
import { updateUserData, deleteUserData, getUserData, getUserDataById } from "../controllers/user.controller.js";

const router = express.Router();

router.route('/').get(getUserData);
router.route('/:id').get(getUserDataById);
router.route('/:id').put(updateUserData);
router.route('/:id').delete(deleteUserData);
export default router;