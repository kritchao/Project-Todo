const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const db = require('../../controllers/index')
const user_db = db.collection('user');

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
    const targetUser = await user_db.doc(payload.id).get();
    if (targetUser.exists) {
        done(null, targetUser.id);
    } else {
        done(null, false);
    }
});

passport.use("jwt", JWTStrategy);