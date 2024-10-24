import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
        minlength: [3, 'Item name must be at least 3 characters long'],
        maxlength: [100, 'Item name cannot exceed 100 characters'],
    },
    pickupAddress: {
        name: {
            type: String,
            required: [true, 'Pickup contact name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Pickup contact email is required'],
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Pickup contact phone number is required'],
            trim: true,
            match: [/^\d{10}$/, 'Please enter a valid phone number (10 digits)'],
        },
        street: { type: String, required: [true, 'Pickup street is required'], trim: true },
        city: { type: String, required: [true, 'Pickup city is required'], trim: true },
        state: { type: String, required: [true, 'Pickup state is required'], trim: true },
        zipCode: {
            type: String,
            required: [true, 'Pickup zip code is required'],
            trim: true,
            match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'], // US zip code format validation
        },
        country: { type: String, required: [true, 'Pickup country is required'], trim: true },
    },
    deliveryAddress: {
        name: {
            type: String,
            required: [true, 'Delivery contact name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Delivery contact email is required'],
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Delivery contact phone number is required'],
            trim: true,
            match: [/^\d{10}$/, 'Please enter a valid phone number (10 digits)'],
        },
        street: { type: String, required: [true, 'Delivery street is required'], trim: true },
        city: { type: String, required: [true, 'Delivery city is required'], trim: true },
        state: { type: String, required: [true, 'Delivery state is required'], trim: true },
        zipCode: {
            type: String,
            required: [true, 'Delivery zip code is required'],
            trim: true,
            match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'], // US zip code format validation
        },
        country: { type: String, required: [true, 'Delivery country is required'], trim: true },
    },
    weight: {
        type: Number,
        required: [true, 'Item weight is required'],
        min: [0.1, 'Weight must be at least 0.1 kg'],
        max: [100, 'Weight cannot exceed 100 kg'],
    },
    dimensions: {
        length: {
            type: Number,
            required: [true, 'Length is required'],
            min: [0.1, 'Length must be at least 0.1 cm'],
        },
        width: {
            type: Number,
            required: [true, 'Width is required'],
            min: [0.1, 'Width must be at least 0.1 cm'],
        },
        height: {
            type: Number,
            required: [true, 'Height is required'],
            min: [0.1, 'Height must be at least 0.1 cm'],
        },
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
            message: '{VALUE} is not a valid status',
        },
        default: 'Pending',
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

itemSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Item = mongoose.model('Item', itemSchema);


const createItem = async (Model, data) => {
    try {
        const item = new Item(data);
        const savedItem = await item.save();
        return { statusCode: 201, success: true, data: savedItem }; // 201 Created
    } catch (error) {
        return { statusCode: 400, success: false, error: error.message }; // 400 Bad Request
    }
};

const getItems = async (Item, query = {}, options = {}) => {
    try {
        const items = await Item.find(query, null, options);
        return { statusCode: 200, success: true, data: items }; // 200 OK
    } catch (error) {
        return { statusCode: 500, success: false, error: error.message }; // 500 Internal Server Error
    }
};

const getItemById = async (Item, id) => {
    try {
        const item = await Item.findById(id);
        if (!item) {
            return { statusCode: 404, success: false, error: 'Item not found' }; // 404 Not Found
        }
        return { statusCode: 200, success: true, data: item }; // 200 OK
    } catch (error) {
        return { statusCode: 400, success: false, error: 'Invalid item ID' }; // 400 Bad Request
    }
};

const updateItem = async (Item, id, updateData) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
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

const deleteItem = async (id) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return { statusCode: 404, success: false, error: 'Item not found' }; // 404 Not Found
        }
        return { statusCode: 200, success: true, data: deletedItem }; // 200 OK
    } catch (error) {
        return { statusCode: 400, success: false, error: 'Invalid item ID' }; // 400 Bad Request
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};

module.exports = Item;
