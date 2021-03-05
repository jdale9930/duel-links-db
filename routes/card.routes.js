const express = require("express")
const router = express.Router();
const cards = require("../models/card.model")

router.post("/add", (req, res)=>{
    return cards.add(res, req.body)
})

router.delete("/delete/:id", (req, res)=>{
    return cards.remove(res, req.params.id)
})
router.get("/clearDeck", (req, res)=>{
    return res.clearDeck(res, req.body)
})
router.post("/byDeckID", (req, res)=>{
    return res.byDeckID(res, req.body)
})

module.exports = router