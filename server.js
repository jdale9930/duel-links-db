require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3003
const userRoutes = require("./routes/users.routes")
const deckRoutes = require("./routes/deck.routes")
const cardRoutes = require("./routes/card.routes")

const bodyParser = require(`body-parser`)
app.use(bodyParser.json())

app.use("/users", userRoutes)
app.use("/decks", deckRoutes)
app.use("/cards", cardRoutes)
app.get("/", (req,res) => res.send("Yo whattup"))
app.get("*", (req, res) => res.redirect("/"))

app.listen(port, ()=> console.log(`Yeehaw server is on ${port}`));