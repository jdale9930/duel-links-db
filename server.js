require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3003
//const userRoutes = require("./routes/user.routes")
//const deckRoutes = require("./routes/deck.routes")
//const cardRoutes = require("./routes/card.routes")

const bodyParser = require(`body-parser`)
app.use(bodyParser.json())

app.get("/", (req,res) => res.send("Yo whattup"))
app.get("*", (req, res) => res.redirect("/"))

app.listen(port, ()=> console.log(`Yeehaw server is on ${port}`));