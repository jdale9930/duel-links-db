const express = require("express")
const router = express.Router();
const cards = require("../models/cards.model")

router.post("/add", (req, res)=>{
    return cards.add(res, req.body)
})

router.delete("/delete/:id", (req, res)=>{
    return cards.remove(res, req.params.id)
})
router.get("/clearDeck", (req, res)=>{
    return res.send(res, req.body)
})
router.post("/byDeckID", (req, res)=>{
    return res.send(res, req.body)
})
