const pool = require("../config/mysql.conf")

async function add(res, deck){
    try{
        if(decks.name.length < 1 || decks.name.length > 40 || isNaN(deck.user_id)){
            throw "Invalid data provided"
        }

        await pool.query("INSERT INTO decks (user_id, name VALUES (?,?)", [deck.user_id, deck.name])
        return res.send({
            success: true,
            data: "Succesfully created a new deck!",
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
}

async function byUserID(res, userID){
    try{
        const[decks] = await pool.query("SELECT * FROM decks WHERE decks.user_id = ?", [userID])
        
        res.send({
            success: true,
            data: decks,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
}

async function all(){
    try{
        const[decks] = await pool.query("SELECT * FROM decks")

        res.send({
            success: true,
            data: decks,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
}