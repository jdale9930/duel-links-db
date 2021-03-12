const express = require("express");
const router = express.Router();
const decks = require("../models/deck.model")
const isAuth = require("../middleware/isAuth")

router.post("/add", (req, res)=>{
    console.log(req.body)
    return decks.add(res, req.body);
})

router.delete("/delete/:id", (req, res)=>{
    return decks.remove(res, req.params.id);
})
router.patch("/edit", (req, res)=>{
    return decks.editName(res, req.body);
})
router.get("/byUserID/:UserID", (req, res)=>{
    return decks.byUserID(res, req.params.UserID);
})
router.get("/all", (req, res)=>{
    return decks.all(res);
})
module.exports = router