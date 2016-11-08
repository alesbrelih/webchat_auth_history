////////////////////////////////////////////////////
// ------ Configure JWT strategy -------------------
///////////////////////////////////////////////////


// needed modules
var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    props = require("../config/properties"),
    User = require("../db/models/user.model");

//exported function that modifies passport strategy
function configurePassportJwt(passport)
{   
    //opts for strategy
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader("token");
    opts.secretOrKey = props.secret;

    //strategy itself
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account
            }
        });
    }));
}

//Export config function
module.exports = configurePassportJwt;