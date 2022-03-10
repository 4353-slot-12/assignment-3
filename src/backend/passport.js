import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from './services/user.js';


function verifyCallback(username, password, done) {
  const user = UserService.findByUsername(username);
  if (user === undefined) return done("User does not exist");
  
  const hash = UserService.generateHash(password, user.salt);
  if (hash === user.hash) return done(null, user);
  return done(null, false, { message: "Bad password" });
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
    const user = UserService.findById(userId);
    if (user === undefined)
      return done("User not found")
    return done(null, user);
});

export default passport;