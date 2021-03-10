const express = require("express");
const router = express.Router();
const user = require("../models/users.model");
const passport = require("passport")

router.get("/authenticate", (req, res)=>{
    if(!req.user){
        return res.send({success: false, data: null, error: null})
    }
    return res.send({success: true, data: {username: req.user.username}, error: null})
})
router.post("/signup", (req, res)=>{
    console.log(req.body)
    return user.signup(res, req.body);
})

router.post("/login", (req, res)=>{
    passport.authenticate("local-login", (err, user, info) =>{
        if (err){
            console.log("line 20")
            return res.send({success: false, data: null, error: "Something went wrong, please try again later!"})
        }
        if (!user){
            return res.send({success: false, data: null, error: info})
        }
        req.logIn(user, (err) => {
            res.cookie("name", "lijarliaer[4p98hqqp9w8e8",{
                httpOnly: true,
                secure: true,
            });
            return res.send({
                success: true,
                data: {username: user.username, id: user.id},
                error: null
            })
        })
    })(req, res)

    // return user.login(res, req.body.username, req.body.password);
})



module.exports = router;