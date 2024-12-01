import passport from "passport";
import passportJWT from "passport-jwt";
import express from 'express';
import mongoose from 'mongoose';
import config from "../../../../config.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "./models/user.model.js";
import { createNewUser } from "./controllers/user.controller.js";
const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const app = express();

//routers
import userRouter from './routes/user.routes.js';
import itemRouter from './routes/item.routes.js';

//defining the JWT strategy
const passportStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SuperSecretKey'  // secret key 
}, (jwt_payload, next) => {
    console.log(jwt_payload)
    next(null, jwt_payload)
});

//init passport strategy
passport.use(passportStrategy);

//handle browser options Request
const handleOptionsReq = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}


try {
    // Replace with your actual MongoDB connection string
    await mongoose.connect(config.DB_URI, {
        useNewUrlParser: true
    });
    console.log('MongoDB connected successfully!');
} catch (error) {
    console.error('MongoDB connection error:', error);
    // process.exit(1); // Exit the process with failure
}


app.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Find user by userId
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid userId or password' });
        }

        // Check password
        if (password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid userId or password' });
            }
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.userId }, 'SuperSecretKey', { expiresIn: '1h' });

        // Respond with token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/register', createNewUser);


//secured routes - auth using user JWT
app.use('/api', handleOptionsReq, passport.authenticate('jwt', { session: false }));
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);




export default app;
