// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    }, createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

let User = mongoose.model('User', UserSchema);
export const createUser = async (data) => {
    const { password } = data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword
        const item = new User(data);
        const savedItem = await item.save();
        return { statusCode: 201, success: true, data: savedItem }; // 201 Created
    } catch (error) {
        return { statusCode: 400, success: false, error: error.message }; // 400 Bad Request
    }
};

export const getUsers = async (query = {}, options = {}) => {
    try {
        const items = await User.find(query, null, options);
        return { statusCode: 200, success: true, data: items }; // 200 OK
    } catch (error) {
        return { statusCode: 500, success: false, error: error.message }; // 500 Internal Server Error
    }
};

export const getUserById = async (id) => {
    try {
        const item = await User.findById(id);
        if (!item) {
            return { statusCode: 404, success: false, error: 'Item not found' }; // 404 Not Found
        }
        return { statusCode: 200, success: true, data: item }; // 200 OK
    } catch (error) {
        return { statusCode: 400, success: false, error: 'Invalid item ID' }; // 400 Bad Request
    }
};

export const updateUser = async (id, updateData) => {
    try {
        const updatedItem = await User.findByIdAndUpdate(id, updateData, {
            new: true, // return the modified document
            runValidators: true, // run schema validators
        });
        if (!updatedItem) {
            return { statusCode: 404, success: false, error: 'Item not found' }; // 404 Not Found
        }
        return { statusCode: 200, success: true, data: updatedItem }; // 200 OK
    } catch (error) {
        return { statusCode: 400, success: false, error: error.message }; // 400 Bad Request
    }
};

export const deleteUser = async (id) => {
    try {
        const deletedItem = await User.findByIdAndDelete(id);
        if (!deletedItem) {
            return { statusCode: 404, success: false, error: 'Item not found' }; // 404 Not Found
        }
        return { statusCode: 200, success: true, data: deletedItem }; // 200 OK
    } catch (error) {
        return { statusCode: 400, success: false, error: 'Invalid item ID' }; // 400 Bad Request
    }
};


export default User;
