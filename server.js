require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const passport = require("./config/passport.conf")
const session = require("express-session")
const bodyParser = require(`body-parser`)
const userRoutes = require("./routes/users.routes")
const deckRoutes = require("./routes/deck.routes")
const cardRoutes = require("./routes/card.routes")

app.use(express.static(__dirname + "/build"))
app.use(bodyParser.json())
app.use(session({ 
    secret: process.env["SECRET_KEY"],
    resave: true,
    saveUninitialized: false,

}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes)
app.use("/decks", deckRoutes)
app.use("/cards", cardRoutes)
app.get("/", (req,res) => res.send("Yo whattup"))
app.get("*", (req, res) => res.redirect("/"))

app.get("*"), (req, res) => {
    res.sendFile("/build/index.html", {root: __dirname + "/"})
}

app.listen(port, ()=> console.log(`Yeehaw server is on ${port}`));