import passport from "passport";
import passportJWT from "passport-jwt";
import express from 'express';

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;

const app = express();

//routers
import mainRouter from '../v1/routes/main.routes.js';

//defining the JWT strategy
const passportStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'superSecret'  // secret key 
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

//secured routes - auth using user JWT
// app.use('/api', handleOptionsReq, passport.authenticate('jwt', { session: false }));
app.use('/api', mainRouter);

export default app;
