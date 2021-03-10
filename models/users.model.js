const bcrypt = require("bcrypt")
const pool = require("../config/mysql.conf")

function isInvalid(val, min, max)
{
    return !val || val.length < min || val.length > max;
}

async function signup(res, userInfo)
{
    console.log(userInfo)
    try{
        const encrypted = await bcrypt.hash(userInfo.password, 8)
        if(isInvalid(userInfo.username, 4, 20) || isInvalid(userInfo.password, 8, 64))
        {
            throw "Invalid Data Provided"
        }

        let [user] =
        await pool.query("SELECT * FROM users WHERE users.username = ?", [userInfo.username])
        
        if(user.length > 0)
        {
            throw "Username is already taken"
        }

        await pool.query("INSERT INTO users (username, password) values (?,?)", [
            userInfo.username,
            encrypted
        ])

        const id = await pool.query("SELECT id FROM users WHERE users.username = ?", [userInfo.username])
        return res.send({
            success: true,
            data: {username: userInfo.username, user_id: id},
            error: null
        })

    }

    catch(err){
        console.log(err)
        return res.send({
            success: false,
            data: null,
            error: err
        })
    }
}

// async function login(res, username, password)
// {
//     try{
//         if(isInvalid(username, 4, 20) || isInvalid(password, 8, 64))
//         {
//             throw "Invalid Data Provided"
//         }

//         let [users] = await pool.query("SELECT * FROM users WHERE users.username = ?", [username])
//         if(users.length === 0){
//             throw "Invalid username or password"
//         }

//         const match = await bcrypt.compare(password, users[0].password)
//         if (!match) {
//             throw "Invalid username or password"
//         }

//         res.send({
//             success: true,
//             data: {username: users[0].username},
//             error: null
//         })    
//     }
//     catch(err){
//         console.log(err)
//         return res.send({
//             success: false,
//             data: null,
//             error: err
//         })
//     }
// }

module.exports = {signup}