const express = require("express");
const router = express.Router();
const user = require("../models/users.model");

router.post("/signup", (req, res)=>{
    return user.signup(res, req.body.username, req.body.password);
})

router.post("/login", (req, res)=>{
    return user.login(res, req.body.username, req.body.password);
})



module.exports = router;