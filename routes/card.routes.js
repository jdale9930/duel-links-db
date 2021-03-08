const express = require("express")
const router = express.Router();
const cards = require("../models/card.model")

router.post("/add", (req, res)=>{
    return cards.add(res, req.body)
})

router.delete("/delete/:id", (req, res)=>{
    return cards.remove(res, req.params.id)
})
router.delete("/clearDeck/:DeckID", (req, res)=>{
    return cards.clearDeck(res, req.params.DeckID)
})
router.get("/byDeckID/:DeckID", (req, res)=>{
    return cards.byDeckID(res, req.params.DeckID)
})

module.exports = router