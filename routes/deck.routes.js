const express = require("express")
const router = express.Router();
const todos = require("../models/todos.model")

router.post("/add", (req, res)=>{
    return todos.add(res, req.body)
})