const express = require("express");
const router = express.Router();
const decks = require("../models/deck.model")

router.post("/add", (req, res)=>{
    return decks.add(res, req.body);
})

router.delete("/delete/:id", (req, res)=>{
    return decks.remove(res, req.params.id);
})
router.patch("/edit", (req, res)=>{
    return decks.editName(res, req.body);
})
router.get("/byUserID", (req, res)=>{
    return decks.byUserID(res, req.body.user_id);
})
router.get("/all", (req, res)=>{
    return decks.all(res);
})
module.exports = router