const express = require("express")
const router = express.Router();
const decks = require("../models/decks.model")

router.post("/add", (req, res)=>{
    return decks.add(res, req.body)
})

router.delete("/delete/:id", (req, res)=>{
    return decks.remove(res, req.params.id)
})
router.update("/edit", (req, res)=>{
    return decks.editName(res, req.body)
})
router.get("/byUserID", (req, res)=>{
    return res.send(res, req.body)
})
router.post("/all", (req, res)=>{
    return res.send(res)
})
