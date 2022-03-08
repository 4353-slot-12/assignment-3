import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import UserService from '../services/user.js';

passport.use(new LocalStrategy(function verify(username, password, callback) {
  const user = UserService.findUsername(username);
  if (user === undefined) return callback("User doesn't exist.");

  crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return callback(err); }
      if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
        return callback(null, false, { message: 'Incorrect username or password.' });
      }
      return callback(null, user);
  })
}));

passport.serializeUser(function(user, callback) {
  process.nextTick(function() {
    callback(null, user.id);
  });
});

passport.deserializeUser(function(userId, callback) {
  process.nextTick(function() {
    const user = UserService.findById(userId);
    return callback(null, user);
  });
});


// passport.use(new LocalStrategy(function verify(username, password, callback) {
//     db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ username ], function(err, row) {
//       if (err) { return callback(err); }
//       if (!row) { return callback(null, false, { message: 'Incorrect username or password.' }); }
  
//       crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//         if (err) { return callback(err); }
//         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//           return callback(null, false, { message: 'Incorrect username or password.' });
//         }
//         return callback(null, row);
//       });
//     });
//   }));

export default passport