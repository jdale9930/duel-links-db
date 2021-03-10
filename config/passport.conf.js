const pool = require("./mysql.conf")
const passport = require("passport")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy

function isInvalid(val, min, max) {
    return !val || val.length < min || val.length > max;
}

passport.serializeUser(function (user, done){
    done(null, user.id)
})

passport.deserializeUser( async function(id, done){
    try{
        const [user] = await pool.query("SELECT * FROM users WHERE users.id = ?", [id])
        if(!user[0])
        {
            return done(null, false)
        }
        return done(null, user[0])
    }
    catch(err){
        done(err, false)
    }
    })

    passport.use(
        "local-login",
    new LocalStrategy(async function login(username, password, done)
    {
        try{
            if(isInvalid(username, 4, 20) || isInvalid(password, 8, 64))
            {
                return done (null, false, "Invalid Data Provided");
            }
    
            let [users] = await pool.query("SELECT * FROM users WHERE users.username = ?", [username])
            if(users.length === 0){
                return done (null, false, "Invalid username or password")
            }
    
            const match = await bcrypt.compare(password, users[0].password)
            if (!match) {
                return done (null, false, "Invalid username or password")
            }
    
            return done(null, users[0])
        }
        catch(err){
            console.log(err)
            return done(err, false)
        }
    })
)
module.exports = passport;