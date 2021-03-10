const pool = require("../config/mysql.conf")

async function add(res, card){
    try{
        if(card.name.length < 1 || card.name.length > 64 || isNaN(card.deck_id)){
            throw "Invalid data provided"
        }

        await pool.query("INSERT INTO cards (deck_id, name, extra) VALUES (?,?,?)", 
        [card.deck_id, card.name, card.extra])

        return res.send({
            success: true,
            data: `${card.name} added to deck`,
            err: null
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

async function remove(res, id){
    try{
        const[card] = await pool.query("DELETE FROM cards WHERE cards.id = ?", [id])
        return res.send({
            success: true,
            data: "Removed card from deck",
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

async function clearDeck(res, id){
    try{
        const[card] = await pool.query("DELETE FROM cards WHERE cards.deck_id = ?", [id])
        return res.send({
            success: true,
            data: "Removed all cards from deck",
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

async function byDeckID(res, deckID){
    try{
        const[cards] = await pool.query("SELECT * FROM cards WHERE cards.deck_id = ?", [deckID])
        
        return res.send({
            success: true,
            data: cards,
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


module.exports = {add, remove, clearDeck, byDeckID}