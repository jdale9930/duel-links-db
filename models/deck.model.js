
const pool = require("../config/mysql.conf")

async function remove(res, id){
    try{
        await pool.query("DELETE FROM decks WHERE decks.id = ?", [id])
        return res.send({
            success: true,
            data: "Succesfully deleted the deck",
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
};

async function add(res, deck){
    try{
        if(deck.name.length < 1 || deck.name.length > 40 || isNaN(deck.user_id)){
            throw "Invalid data provided"
        }

        await pool.query("INSERT INTO decks (user_id, name) VALUES (?,?)", [deck.user_id, deck.name])
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
};

async function editName(res, deck)
{
    try{
        if(isNaN(deck.id) ||
            !deck.name ||
            deck.name < 1 ||
            deck.name > 20)
        {
            throw "Invalid Data Provided"
        }
        await pool.query("UPDATE decks SET name = ? WHERE decks.id = ?", [deck.name, deck.id])

        return res.send({
            success: true,
            data: "Successfully changed name",
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
};

async function byUserID(res, userID){
    try{
        const[decks] = await pool.query("SELECT * FROM decks WHERE decks.user_id = ?", [userID])
        
        return res.send({
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
};

async function all(res){
    try{
        const[decks] = await pool.query("SELECT * FROM decks")

        return res.send({
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
};
module.exports = {remove, add, editName, byUserID, all}